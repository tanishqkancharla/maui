/**
 * Generate Maui brand assets (OG images + favicon PNGs) with Satori + resvg.
 *
 * Usage: node scripts/generate-og-image.mjs
 * Output:
 *   src/public/og-light.png, og-dark.png, og.png (light)
 *   src/public/favicon-light.png, favicon-dark.png
 *   src/public/apple-touch-icon.png
 */
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { createElement as h } from "react"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const publicDir = join(root, "src/public")

const WIDTH = 1200
const HEIGHT = 630
const FAVICON_SIZE = 32
const APPLE_TOUCH_SIZE = 180

// Match Maui light / dark tokens (Radix teal → violet accent, gray scale).
const themes = {
	light: {
		background: "#ffffff",
		title: "#202020", // gray[12]
		subtitle: "#646464", // gray[11]
		accent: "#12a594", // accent[9] teal
	},
	dark: {
		background: "#111111", // gray[1] / app surface
		title: "#eeeeee", // gray[12]
		subtitle: "#b4b4b4", // gray[11]
		accent: "#6e56cf", // accent[9] violet
	},
}

function layout(theme) {
	return h(
		"div",
		{
			style: {
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "flex-start",
				padding: "48px 116px",
				backgroundColor: theme.background,
				fontFamily: "Inter",
			},
		},
		h(
			"div",
			{
				style: {
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					gap: 72,
				},
			},
			h("div", {
				style: {
					width: 52,
					height: 52,
					borderRadius: 9999,
					backgroundColor: theme.accent,
				},
			}),
			h(
				"div",
				{
					style: {
						fontSize: 40,
						fontWeight: 600,
						lineHeight: 1.3,
						color: theme.title,
					},
				},
				"Maui",
			),
			h(
				"div",
				{
					style: {
						fontSize: 40,
						fontWeight: 400,
						lineHeight: 1.3,
						color: theme.subtitle,
					},
				},
				"A design system",
			),
		),
	)
}

function renderDotPng(accent, size, { background } = {}) {
	const bg =
		background != null
			? `<rect width="${size}" height="${size}" fill="${background}"/>`
			: ""
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${bg}<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${accent}"/></svg>`
	return new Resvg(svg, {
		fitTo: { mode: "width", value: size },
		background: background ?? "rgba(0,0,0,0)",
	})
		.render()
		.asPng()
}

async function renderPng(theme, fonts) {
	const svg = await satori(layout(theme), {
		width: WIDTH,
		height: HEIGHT,
		fonts,
	})
	const resvg = new Resvg(svg, {
		fitTo: { mode: "width", value: WIDTH },
	})
	return resvg.render().asPng()
}

async function main() {
	const [semiBold, regular] = await Promise.all([
		readFile(join(__dirname, "fonts/Inter-SemiBold.ttf")),
		readFile(join(__dirname, "fonts/Inter-Regular.ttf")),
	])

	const fonts = [
		{
			name: "Inter",
			data: regular,
			weight: 400,
			style: "normal",
		},
		{
			name: "Inter",
			data: semiBold,
			weight: 600,
			style: "normal",
		},
	]

	await mkdir(publicDir, { recursive: true })

	const lightPng = await renderPng(themes.light, fonts)
	const darkPng = await renderPng(themes.dark, fonts)
	const faviconLight = renderDotPng(themes.light.accent, FAVICON_SIZE)
	const faviconDark = renderDotPng(themes.dark.accent, FAVICON_SIZE)
	// Opaque white behind the dot — iOS fills transparent apple-touch corners with black.
	const appleTouch = renderDotPng(themes.light.accent, APPLE_TOUCH_SIZE, {
		background: themes.light.background,
	})

	const lightPath = join(publicDir, "og-light.png")
	const darkPath = join(publicDir, "og-dark.png")
	const canonicalPath = join(publicDir, "og.png")
	const faviconLightPath = join(publicDir, "favicon-light.png")
	const faviconDarkPath = join(publicDir, "favicon-dark.png")
	const appleTouchPath = join(publicDir, "apple-touch-icon.png")

	await Promise.all([
		writeFile(lightPath, lightPng),
		writeFile(darkPath, darkPng),
		// Canonical social URL stays light (scrapers pick one image).
		writeFile(canonicalPath, lightPng),
		writeFile(faviconLightPath, faviconLight),
		writeFile(faviconDarkPath, faviconDark),
		writeFile(appleTouchPath, appleTouch),
	])

	console.log(`Wrote ${lightPath} (${lightPng.byteLength} bytes)`)
	console.log(`Wrote ${darkPath} (${darkPng.byteLength} bytes)`)
	console.log(`Wrote ${canonicalPath} (${lightPng.byteLength} bytes)`)
	console.log(`Wrote ${faviconLightPath} (${faviconLight.byteLength} bytes)`)
	console.log(`Wrote ${faviconDarkPath} (${faviconDark.byteLength} bytes)`)
	console.log(`Wrote ${appleTouchPath} (${appleTouch.byteLength} bytes)`)
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
