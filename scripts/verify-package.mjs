#!/usr/bin/env node
/**
 * Pack Maui and validate the real tarball: required files, case-sensitive
 * relative imports, declarations, and a fresh consumer install/import.
 * Does not mock the package contents.
 */
import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const requiredTarballPaths = [
	"package/package.json",
	"package/dist/maui.js",
	"package/dist/maui.d.ts",
	"package/dist/MauiProvider.js",
	"package/dist/MauiProvider.d.ts",
	"package/dist/tokens/colors.js",
	"package/dist/tokens/colors.d.ts",
	"package/dist/tokens/borders.js",
	"package/dist/components/Avatar.js",
	"package/dist/components/Button.js",
	"package/dist/icons/index.js",
	"package/dist/icons/index.d.ts",
	"package/src/maui.ts",
	"package/skills/maui/SKILL.md",
	"package/LICENSE",
	"package/NOTICE",
]

const importPattern =
	/(?:from|import)\s+["'](\.[^"']+)["']|import\s*\(\s*["'](\.[^"']+)["']\s*\)/g

function run(command, args, cwd = repoRoot) {
	return execFileSync(command, args, {
		cwd,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
	})
}

function listTarball(tarballPath) {
	const listing = run("tar", ["-tzf", tarballPath])
	return listing.split("\n").filter(Boolean)
}

function assertCaseSensitivePath(extractedRoot, posixPath) {
	const parts = posixPath.split("/").filter(Boolean)
	let current = extractedRoot
	for (const part of parts) {
		const names = readdirSync(current)
		if (!names.includes(part)) {
			const ignoreCase = names.find((name) => name.toLowerCase() === part.toLowerCase())
			throw new Error(
				ignoreCase
					? `Case-sensitive path missing: ${posixPath} (found ${ignoreCase})`
					: `Missing path: ${posixPath}`,
			)
		}
		current = join(current, part)
	}
}

function resolveRelativeImport(fromFile, specifier, extractedRoot) {
	const fromDir = dirname(fromFile)
	const raw = specifier.startsWith("./") || specifier.startsWith("../") ? specifier : null
	if (raw === null) return
	const candidates = [
		raw,
		`${raw}.js`,
		`${raw}.d.ts`,
		`${raw}/index.js`,
		`${raw}/index.d.ts`,
	]
	for (const candidate of candidates) {
		const absolute = resolve(fromDir, candidate)
		if (existsSync(absolute)) {
			const posix = relative(extractedRoot, absolute).split("\\").join("/")
			assertCaseSensitivePath(extractedRoot, posix)
			return
		}
	}
	throw new Error(`Unresolved relative import ${specifier} from ${relative(extractedRoot, fromFile)}`)
}

function verifyRelativeImports(extractedRoot) {
	const distRoot = join(extractedRoot, "package", "dist")
	const queue = [distRoot]
	while (queue.length > 0) {
		const current = queue.pop()
		if (current === undefined) break
		for (const entry of readdirSync(current, { withFileTypes: true })) {
			const path = join(current, entry.name)
			if (entry.isDirectory()) {
				queue.push(path)
				continue
			}
			if (!entry.name.endsWith(".js")) continue
			const source = readFileSync(path, "utf8")
			for (const match of source.matchAll(importPattern)) {
				const specifier = match[1] ?? match[2]
				if (specifier === undefined) continue
				resolveRelativeImport(path, specifier, extractedRoot)
			}
		}
	}
}

function verifyPackageJson(extractedRoot) {
	const pkg = JSON.parse(readFileSync(join(extractedRoot, "package", "package.json"), "utf8"))
	if (pkg.main !== "./dist/maui.js") {
		throw new Error(`package.json main must be ./dist/maui.js, got ${pkg.main}`)
	}
	if (pkg.types !== "./dist/maui.d.ts") {
		throw new Error(`package.json types must be ./dist/maui.d.ts, got ${pkg.types}`)
	}
	if (pkg.exports?.["."]?.import !== "./dist/maui.js") {
		throw new Error("Root export import must resolve to dist/maui.js")
	}
	if (pkg.exports?.["./icons"]?.import !== "./dist/icons/index.js") {
		throw new Error("icons export import must resolve to dist/icons/index.js")
	}
	if (pkg.scripts?.prepare) {
		throw new Error("Packed package must not run a prepare build on install")
	}
	if (!pkg.peerDependencies?.react || !pkg.peerDependencies?.["react-dom"]) {
		throw new Error("React and react-dom must be peer dependencies")
	}
	const sideEffects = pkg.sideEffects
	if (sideEffects === false) {
		throw new Error("sideEffects: false would allow bundlers to drop MauiProvider CSS/setup")
	}
}

function consumeTarball(tarballPath) {
	const consumerRoot = mkdtempSync(join(tmpdir(), "maui-consumer-"))
	try {
		run("npm", ["init", "-y"], consumerRoot)
		run(
			"npm",
			[
				"install",
				"--ignore-scripts",
				tarballPath,
				"react@19.2.7",
				"react-dom@19.2.7",
			],
			consumerRoot,
		)
		const pkgPath = join(
			consumerRoot,
			"node_modules",
			"@tanishqkancharla",
			"maui",
			"package.json",
		)
		if (!existsSync(pkgPath)) {
			throw new Error("Consumer did not install @tanishqkancharla/maui")
		}
		const installed = JSON.parse(readFileSync(pkgPath, "utf8"))
		if (installed.scripts?.prepare) {
			throw new Error("Installed package still has a prepare script")
		}
		const installedRoot = dirname(pkgPath)
		if (!existsSync(join(installedRoot, "dist", "maui.d.ts"))) {
			throw new Error("Installed package is missing dist/maui.d.ts")
		}
		if (!existsSync(join(installedRoot, "dist", "icons", "index.d.ts"))) {
			throw new Error("Installed package is missing dist/icons/index.d.ts")
		}
		const importLog = run(
			"node",
			[
				"--input-type=module",
				"-e",
				`
				const root = await import.meta.resolve("@tanishqkancharla/maui")
				const icons = await import.meta.resolve("@tanishqkancharla/maui/icons")
				const pkg = await import.meta.resolve("@tanishqkancharla/maui/package.json")
				console.log("resolve_package", pkg)
				console.log("resolve_root", root)
				console.log("resolve_icons", icons)
				if (!root.endsWith("/dist/maui.js")) throw new Error("Root did not resolve to dist/maui.js")
				if (!icons.endsWith("/dist/icons/index.js")) throw new Error("Icons did not resolve to dist/icons/index.js")
				`,
			],
			consumerRoot,
		)
		process.stdout.write(importLog)
		// Halo/Vite resolve extensionless dist imports. Bundle the installed files the same way.
		const bundleOut = join(consumerRoot, "bundle.mjs")
		run(
			join(repoRoot, "node_modules", "esbuild", "bin", "esbuild"),
			[
				join(installedRoot, "dist", "maui.js"),
				"--bundle",
				"--format=esm",
				"--platform=neutral",
				"--packages=external",
				`--outfile=${bundleOut}`,
			],
			consumerRoot,
		)
		const iconsOut = join(consumerRoot, "icons.mjs")
		run(
			join(repoRoot, "node_modules", "esbuild", "bin", "esbuild"),
			[
				join(installedRoot, "dist", "icons", "index.js"),
				"--bundle",
				"--format=esm",
				"--platform=neutral",
				"--packages=external",
				`--outfile=${iconsOut}`,
			],
			consumerRoot,
		)
		if (!existsSync(bundleOut) || !existsSync(iconsOut)) {
			throw new Error("esbuild did not emit consumer bundles for root and icons")
		}
	} finally {
		rmSync(consumerRoot, { recursive: true, force: true })
	}
}

function main() {
	if (!existsSync(join(repoRoot, "dist", "maui.js"))) {
		console.log("Building library…")
		run("npm", ["run", "build:lib"])
	}

	console.log("Packing…")
	const packOutput = run("npm", ["pack", "--pack-destination", repoRoot])
	const tarballName = packOutput.trim().split("\n").at(-1)
	if (tarballName === undefined || !tarballName.endsWith(".tgz")) {
		throw new Error(`npm pack did not print a tarball name: ${packOutput}`)
	}
	const tarballPath = join(repoRoot, tarballName)
	const listing = listTarball(tarballPath)
	const listingSet = new Set(listing)

	for (const required of requiredTarballPaths) {
		if (!listingSet.has(required)) {
			throw new Error(`Tarball is missing ${required}`)
		}
	}
	if (listing.some((path) => path === "package/dist" && !listingSet.has("package/dist/maui.js"))) {
		throw new Error("Tarball dist/ is incomplete")
	}

	const extractedRoot = mkdtempSync(join(tmpdir(), "maui-tarball-"))
	try {
		run("tar", ["-xzf", tarballPath, "-C", extractedRoot])
		for (const required of requiredTarballPaths) {
			assertCaseSensitivePath(extractedRoot, required)
		}
		verifyPackageJson(extractedRoot)
		verifyRelativeImports(extractedRoot)
		console.log("Tarball files and relative imports are complete.")
		consumeTarball(tarballPath)
		console.log("Fresh consumer resolved root and icons from the tarball.")
	} finally {
		rmSync(extractedRoot, { recursive: true, force: true })
	}

	console.log(`Verified ${tarballName}`)
}

try {
	main()
} catch (error) {
	const message = error instanceof Error ? error.message : String(error)
	const stderr = error && typeof error === "object" && "stderr" in error ? error.stderr : ""
	console.error(message)
	if (stderr) console.error(String(stderr))
	process.exit(1)
}
