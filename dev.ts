import { build } from "estrella";
import fs from "fs/promises";

async function dev() {
	await fs.copyFile("./src/index.html", "./dist/index.html");
	await fs.copyFile("./src/style.css", "./dist/style.css");

	build({
		entry: ["./src/index.tsx"],
		outdir: "dist",
		sourceRoot: "src",
		watch: true,
		bundle: true,
		minify: false,

		tslint: "on",
		sourcemap: "inline",
		sourcesContent: true,
		run: "serve -n -l 3000 dist",
	});
}

dev();
