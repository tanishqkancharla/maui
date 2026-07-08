import { Prose } from "../components/Prose"
import {
	Blockquote,
	H1,
	H2,
	H3,
	Label,
	Link,
	P,
} from "../components/Typography"

export function ProsePage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Prose</H2>
			<P>
				Typography components carry no margin of their own. <code>Prose</code>{" "}
				is the wrapper that supplies vertical rhythm between headings,
				paragraphs, and other block content — spacing is a property of the
				container, not the elements passing through it.
			</P>

			<H3>Example</H3>
			<div className="maui-example-panel">
				<Prose>
					<H1>Heading 1</H1>
					<H2>Heading 2</H2>
					<H3>Heading 3</H3>
					<Label>Field label</Label>
					<P>
						Early computers were huge machines that filled whole rooms. People
						used punch cards and simple commands to help them solve math and
						business problems.
					</P>
					<P>
						Over time, computers became smaller, faster, and easier to use.
						They moved from labs into homes, phones, and schools, and now help
						people write, design, learn, and talk to each other. Paragraph
						text supports inline links like{" "}
						<Link href="https://open-ui.org">Open UI</Link>.
					</P>
					<Blockquote>
						A blockquote gives longer cited or emphasized text a calm,
						accented presentation.
					</Blockquote>
				</Prose>
			</div>
		</Prose>
	)
}
