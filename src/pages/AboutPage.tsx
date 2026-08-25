import { Prose } from "../components/Prose"
import { H2, Link, P } from "../components/Typography"

export function AboutPage() {
	return (
		<Prose>
			<H2>About</H2>
			<P>
				Maui is a personal design system developed by{" "}
				<Link href="https://tanishqkancharla.dev">Tanishq Kancharla</Link>. It
				is not licensed to be used by any commercial projects except to those
				granted by him.
			</P>
			<P>For any questions, email tanishqkancharla3@gmail.com.</P>
		</Prose>
	)
}
