import { build as esbuild } from "esbuild";
import fs from "fs/promises";

const buildSrc = async () => {
	await Promise.all([
		esbuild({
			entryPoints: ["./src/index.tsx", "./src/style.css"],
			outdir: "dist",
			sourceRoot: "src",
			sourcemap: "inline",
			sourcesContent: true,
			bundle: true,
			minify: false,
		}),

		fs.copyFile("./src/index.html", "./dist/index.html"),
	]);
};

buildSrc();
