import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { previewFrameAncestors } from "product-doc/preview"

export default defineConfig(({ command, mode }) => {
	const deferredDevPages = fileURLToPath(
		new URL("./src/pages/GalleryDeferredPages.dev.tsx", import.meta.url),
	)
	const deferHeavyPages = command === "serve" || mode === "review"
	// Product-doc previews ship to preview deployments, never to production.
	// In development they run on their own server (`npm run dev:previews`):
	// a second entry under bundled dev splits shared chunks ahead of the React
	// Refresh preamble and breaks the gallery.
	const previewsDev = command === "serve" && mode === "previews"
	const includePreviews =
		command === "build" && process.env.VERCEL_ENV !== "production"

	return {
		root: "src",
		plugins: [
			react({}),
			{
				name: "preview-frame-ancestors",
				configureServer(server) {
					server.middlewares.use((request, response, next) => {
						if (request.url?.startsWith("/previews")) {
							response.setHeader("Content-Security-Policy", previewFrameAncestors)
						}
						next()
					})
				},
			},
		],
		resolve: {
			alias:
				deferHeavyPages
					? [
							{
								find: /^\.\/GalleryDeferredPages$/,
								replacement: deferredDevPages,
							},
							{
								find: /^\.\/pages\/GalleryDeferredPages$/,
								replacement: deferredDevPages,
							},
						]
					: [],
		},
		// Bundle the gallery's large module graph for high-latency orb previews.
		// This affects development only; production build options stay unchanged.
		experimental: {
			bundledDev: !process.env.VITEST && !previewsDev,
		},
		server: {
			host: "127.0.0.1",
			port: 5173,
			strictPort: true,
			watch: {
				// The native fsevents watcher silently misses file changes in this
				// environment, breaking HMR. Polling is reliable.
				usePolling: true,
				interval: 150,
			},
		},
		build: {
			// Website/gallery output — separate entry from the library package `dist/`.
			outDir: "../website",
			emptyOutDir: true,
			rollupOptions: {
				input: {
					index: fileURLToPath(new URL("./src/index.html", import.meta.url)),
					...(includePreviews
						? {
								previews: fileURLToPath(
									new URL("./src/previews.html", import.meta.url),
								),
							}
						: {}),
				},
			},
		},
	}
})
