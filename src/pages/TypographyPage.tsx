import {
	Blockquote,
	H1,
	H2,
	H3,
	Label,
	Link,
	P,
} from "../components/Typography"

export function TypographyPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Typography</H2>
			<H1>Heading 1</H1>
			<H2>Heading 2</H2>
			<H3>Heading 3</H3>
			<Label>Field label</Label>
			<P>
				Early computers were huge machines that filled whole rooms. People used
				punch cards and simple commands to help them solve math and business
				problems.
			</P>
			<P>
				Over time, computers became smaller, faster, and easier to use. They moved
				from labs into homes, phones, and schools, and now help people write,
				design, learn, and talk to each other. Paragraph text supports inline links
				like <Link href="https://open-ui.org">Open UI</Link>.
			</P>
			<Blockquote>
				A blockquote gives longer cited or emphasized text a calm, accented
				presentation.
			</Blockquote>
		</section>
	)
}
