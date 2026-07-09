import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	root: "src",
	plugins: [react({})],
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
		outDir: "../dist",
		emptyOutDir: true,
	},
	optimizeDeps: {
		exclude: ["shiki", "shiki/wasm"],
	},
})
