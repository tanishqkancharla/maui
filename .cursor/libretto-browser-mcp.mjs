#!/usr/bin/env node
/**
 * Stdio MCP server exposing Libretto Browser Tools
 * (https://libretto.sh/browser-tools) for Cursor IDE + Cloud Agents.
 *
 * Tools: browser_open, browser_connect, browser_exec, browser_snapshot,
 * browser_status, browser_close.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { LocalBrowserProvider } from "libretto-browser-tools"
import { registerMcpBrowserTools } from "libretto-browser-tools/mcp"

const headless = process.env.LIBRETTO_BROWSER_HEADLESS !== "0"
const channel = process.env.LIBRETTO_BROWSER_CHANNEL || undefined

const server = new McpServer({
	name: "libretto-browser-tools",
	version: "1.0.0",
})

const { dispose } = registerMcpBrowserTools(
	server,
	new LocalBrowserProvider({ headless, channel }),
)

const transport = new StdioServerTransport()
await server.connect(transport)

async function shutdown() {
	try {
		await server.close()
	} finally {
		await dispose()
	}
	process.exit(0)
}

process.once("SIGINT", shutdown)
process.once("SIGTERM", shutdown)
