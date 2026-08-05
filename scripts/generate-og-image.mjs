/**
 * Generate the Maui Open Graph image with Satori + resvg.
 *
 * Usage: node scripts/generate-og-image.mjs
 * Output: src/public/og.png
 */
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { createElement as h } from "react"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const outPath = join(root, "src/public/og.png")

// Match Maui light tokens: accent[9] teal, gray text on white canvas.
const ACCENT = "#12a594"
const TITLE = "#202020"
const SUBTITLE = "#646464"
const BACKGROUND = "#ffffff"

const WIDTH = 1200
const HEIGHT = 630

async function main() {
	const [semiBold, regular] = await Promise.all([
		readFile(join(__dirname, "fonts/Inter-SemiBold.ttf")),
		readFile(join(__dirname, "fonts/Inter-Regular.ttf")),
	])

	const svg = await satori(
		h(
			"div",
			{
				style: {
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "flex-start",
					padding: "96px 112px",
					backgroundColor: BACKGROUND,
					fontFamily: "Inter",
				},
			},
			h("div", {
				style: {
					width: 56,
					height: 56,
					borderRadius: 9999,
					backgroundColor: ACCENT,
					marginBottom: 48,
				},
			}),
			h(
				"div",
				{
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 16,
					},
				},
				h(
					"div",
					{
						style: {
							fontSize: 88,
							fontWeight: 600,
							lineHeight: 1.05,
							letterSpacing: "-0.03em",
							color: TITLE,
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
							color: SUBTITLE,
						},
					},
					"A design system",
				),
			),
		),
		{
			width: WIDTH,
			height: HEIGHT,
			fonts: [
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
			],
		},
	)

	const resvg = new Resvg(svg, {
		fitTo: { mode: "width", value: WIDTH },
	})
	const png = resvg.render().asPng()

	await mkdir(dirname(outPath), { recursive: true })
	await writeFile(outPath, png)
	console.log(`Wrote ${outPath} (${png.byteLength} bytes)`)
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
