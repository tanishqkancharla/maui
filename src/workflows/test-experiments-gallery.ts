import { z } from "zod"
import { workflow, type LibrettoWorkflowContext } from "libretto"

const inputSchema = z.object({
	baseUrl: z.string().url().default("http://127.0.0.1:5173"),
})

const pageResultSchema = z.object({
	label: z.string(),
	href: z.string(),
	url: z.string(),
	heading: z.string().nullable(),
	mainLen: z.number().int().nonnegative(),
})

const outputSchema = z.object({
	title: z.string(),
	linkCount: z.number().int().nonnegative(),
	pages: z.array(pageResultSchema),
})

export default workflow("test-experiments-gallery", {
	input: inputSchema,
	output: outputSchema,
	startUrl: "http://127.0.0.1:5173/",
	handler: async (ctx: LibrettoWorkflowContext, input) => {
		const { page } = ctx

		if (!page.url().startsWith(input.baseUrl)) {
			await page.goto(input.baseUrl)
		}

		await page.getByRole("navigation").waitFor()
		const title = await page.title()
		if (title !== "Experiments") {
			throw new Error(`Expected document title "Experiments", got ${JSON.stringify(title)}`)
		}

		const navLinks = page.getByRole("navigation").getByRole("link")
		const linkCount = await navLinks.count()
		if (linkCount < 1) {
			throw new Error("Expected at least one gallery nav link")
		}

		const pages: z.infer<typeof pageResultSchema>[] = []

		for (let i = 0; i < linkCount; i++) {
			const link = navLinks.nth(i)
			const label = (await link.innerText()).trim()
			const href = (await link.getAttribute("href")) ?? ""
			await link.click()
			await page.waitForURL((url) => url.hash.includes(href.replace(/^#/, "")))

			const shell = page.getByRole("main").first()
			const mainText = (await shell.innerText()).trim()
			const heading =
				(await page
					.getByRole("heading", { level: 2 })
					.first()
					.textContent()
					.catch(() => null)) ?? null

			if (!page.url().includes(href.slice(1))) {
				throw new Error(
					`Nav "${label}" expected hash from ${href}, landed on ${page.url()}`,
				)
			}
			if (mainText.length < 20) {
				throw new Error(`Nav "${label}" rendered empty main content`)
			}

			pages.push({
				label,
				href,
				url: page.url(),
				heading,
				mainLen: mainText.length,
			})
		}

		console.log("gallery-nav-ok", { linkCount, title })
		return { title, linkCount, pages }
	},
})
