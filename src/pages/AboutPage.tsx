import { Prose } from "../components/Prose"
import { H2, Link, P } from "../components/Typography"

export function AboutPage() {
	return (
		<Prose>
			<H2>About</H2>
			<P>
				Maui is an open-source design system. It is developed as part of{" "}
				<Link href="https://gethalo.dev">Halo</Link>. It is available under the{" "}
				<Link href="https://github.com/tanishqkancharla/maui/blob/main/LICENSE">
					MIT License
				</Link>
				.
			</P>
			<P>For any questions, email tanishqkancharla3@gmail.com.</P>
		</Prose>
	)
}
