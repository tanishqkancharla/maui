import React from "react"
import { H3, Link, P, typographyMaxWidth } from "../components/Typography"

export function FluidCursorEditor() {
	return (
		<div>
			<H3>Fluid Cursor Editor (Gem)</H3>
			<P>
				Gem is a text editor I built early into my experiments that features a
				very minimal syntax and an animated cursor. Gem's goals are to be
				approachable, simple, and playful.
			</P>
			<P>
				This page uses an iframe; here is{" "}
				<Link href="https://gem.tanishqkancharla.dev">
					a link to the hosted experiment
				</Link>{" "}
				as well as{" "}
				<Link href="https://tanishqkancharla.dev/projects/gem">
					a slightly longer write-up on my main website
				</Link>
				.
			</P>
			<iframe
				style={{
					width: "100%",
					maxWidth: typographyMaxWidth,
					height: "40vh",
					border: "1.5px solid var(--sand-11)",
					borderRadius: 2,
				}}
				src="https://gem.tanishqkancharla.dev"
			/>
		</div>
	)
}
