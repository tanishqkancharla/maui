import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import {
	Blockquote,
	H1,
	H2,
	H3,
	Label,
	Li,
	Link,
	Ol,
	P,
	Ul,
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
			<Panel>
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
					<Ul>
						<Li>Bullet lists group related points without implying order.</Li>
						<Li>
							List items can include inline links like{" "}
							<Link href="https://open-ui.org">Open UI</Link>.
						</Li>
						<Li>
							Nested lists work for sub-points:
							<Ul>
								<Li>First sub-point</Li>
								<Li>Second sub-point</Li>
							</Ul>
						</Li>
					</Ul>
					<Ol>
						<Li>Numbered lists communicate sequence or priority.</Li>
						<Li>Each step gets a decimal marker.</Li>
						<Li>Use them for instructions, rankings, or timelines.</Li>
					</Ol>
				</Prose>
			</Panel>

			<H3>Sizes</H3>
			<P>
				<code>Prose</code> takes a <code>size</code> prop that sets the reading
				type scale for the typography inside it. Paragraph text is a step
				larger than application text and defaults to <code>md</code>.
			</P>
			<Panel>
				<Prose size="sm">
					<Label>size=&quot;sm&quot;</Label>
					<P>
						Small prose sits at the size of dense application copy — useful
						for compact cards or captions that still read as prose.
					</P>
				</Prose>
			</Panel>
			<Panel>
				<Prose size="md">
					<Label>size=&quot;md&quot; (default)</Label>
					<P>
						Medium is the default reading size: comfortably larger than UI
						text, with line-height tuned for sustained reading.
					</P>
				</Prose>
			</Panel>
			<Panel>
				<Prose size="lg">
					<Label>size=&quot;lg&quot;</Label>
					<P>
						Large prose suits marketing or hero passages where the text is the
						primary focus of the page.
					</P>
				</Prose>
			</Panel>
		</Prose>
	)
}
