#!/usr/bin/env node
/**
 * Stdio + HTTP MCP server for Agentation
 * (https://www.agentation.com/install).
 *
 * HTTP listens on 4747 by default; stdio exposes annotation tools to Cursor.
 * Uses the locally installed `agentation-mcp` package so cloud VMs do not
 * need `npx -y` at MCP boot.
 */
import { spawn } from "node:child_process"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const cli = join(root, "node_modules/agentation-mcp/dist/cli.js")

const child = spawn(
	process.execPath,
	[cli, "server", ...process.argv.slice(2)],
	{
		cwd: root,
		stdio: "inherit",
		env: process.env,
	},
)

child.on("exit", (code, signal) => {
	if (signal) {
		process.kill(process.pid, signal)
		return
	}
	process.exit(code ?? 1)
})

for (const signal of ["SIGINT", "SIGTERM"]) {
	process.on(signal, () => {
		child.kill(signal)
	})
}
