import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { MermaidDiagram } from "../components/MermaidDiagram"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Panel } from "./Panel"

const example = `flowchart LR
  Source[Mermaid source] --> Parse[Parse and layout]
  Parse --> Theme{Maui theme}
  Theme -->|Light| Light[Teal accent]
  Theme -->|Dark| Dark[Violet accent]
  Light --> SVG[Responsive SVG]
  Dark --> SVG`

export function MermaidDiagramPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Mermaid diagram</H2>
			<P>
				<Code>MermaidDiagram</Code> renders Mermaid source as a responsive SVG
				with <Code>beautiful-mermaid</Code>. Diagram surfaces, labels, lines,
				borders, and accents use Maui color tokens and follow the active theme.
				Corner actions open the source in the Beautiful Mermaid editor, copy it,
				or show the diagram fullscreen.
			</P>

			<H3>Example</H3>
			<Panel>
				<MermaidDiagram
					source={example}
					aria-label="Maui Mermaid rendering flow"
				/>
			</Panel>

			<H3>Usage</H3>
			<CodeBlock lang="tsx">{`<MermaidDiagram
	aria-label="Request flow"
	source={\`flowchart LR
	Client --> API
	API --> Database\`}
/>`}</CodeBlock>
		</Prose>
	)
}
