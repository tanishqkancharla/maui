import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Prose } from "../components/Prose"
import { H2, H3, Li, Link, P, Ul } from "../components/Typography"

export function ReadmePage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Maui</H2>
			<P>
				Maui is an open-source, TypeScript-first design system styled with{" "}
				<Link href="https://www.npmjs.com/package/purse-styles">
					purse-styles
				</Link>
				. It is developed as part of{" "}
				<Link href="https://gethalo.dev">Halo</Link>. This site is a gallery of
				its tokens, components, patterns, and demo apps.
			</P>
			<Ul>
				<Li>
					Source:{" "}
					<Link href="https://github.com/tanishqkancharla/maui">
						github.com/tanishqkancharla/maui
					</Link>
				</Li>
				<Li>
					Package:{" "}
					<Link href="https://www.npmjs.com/package/@tanishqkancharla/maui">
						@tanishqkancharla/maui
					</Link>
				</Li>
			</Ul>

			<H3>Install</H3>
			<CodeBlock lang="sh">{`npm install @tanishqkancharla/maui motion`}</CodeBlock>
			<P>
				<Code>motion</Code> is a required peer dependency, used by components
				with animated presence and transitions. The package ships compiled
				JavaScript and type declarations.
			</P>

			<H3>Usage</H3>
			<P>
				Wrap your app in <Code>MauiProvider</Code>, then import tokens and
				components:
			</P>
			<CodeBlock lang="tsx">{`import { MauiProvider, Button } from "@tanishqkancharla/maui"

function App() {
	return (
		<MauiProvider>
			<Button>Hello</Button>
		</MauiProvider>
	)
}`}</CodeBlock>
			<P>
				Put the exported <Code>themeFoucScript</Code> in an inline{" "}
				<Code>{"<script>"}</Code> in <Code>{"<head>"}</Code> so the theme is
				correct on first paint.
			</P>

			<H3>Develop</H3>
			<CodeBlock lang="sh">{`npm install
npm run dev`}</CodeBlock>
			<P>
				Vite serves this gallery locally. Patterns and demo apps are reference
				implementations, not package components.
			</P>

			<H3>License</H3>
			<P>
				Maui is available under the{" "}
				<Link href="https://github.com/tanishqkancharla/maui/blob/main/LICENSE">
					MIT License
				</Link>
				.
			</P>

			<H3>Contact</H3>
			<P>For any questions, email tanishqkancharla3@gmail.com.</P>
		</Prose>
	)
}
