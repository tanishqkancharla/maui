import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	root: "src",
	plugins: [react({})],
	// Bundle the gallery's large module graph for high-latency orb previews.
	// This affects development only; production build options stay unchanged.
	experimental: {
		bundledDev: !process.env.VITEST,
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
	},
	optimizeDeps: {
		exclude: ["shiki", "shiki/wasm"],
	},
})
