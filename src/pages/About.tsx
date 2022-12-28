import { H3, Link, P } from "../components/Typography"

export function About() {
	return (
		<>
			<H3>About this</H3>
			<P>
				This is a collection of various UX experiments I've worked on. They vary
				from a range of practicing my design skills to replicating UX I've found
				in other apps. For my main website, please visit{" "}
				<Link href="www.tanishqkancharla.dev">tanishqkancharla.dev</Link>
			</P>
		</>
	)
}
