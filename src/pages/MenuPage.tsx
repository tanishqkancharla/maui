import { useState } from "react"
import { Button } from "../components/Button"
import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Menu, MenuItem, MenuTrigger } from "../components/Menu"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { DotsHorizontal } from "../icons"

export function MenuPage() {
	const [lastAction, setLastAction] = useState<string>()

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Menu</H2>
			<P>
				A triggered collection of actions that opens in a popover. The
				trigger can be a Maui <Code>Button</Code> or a custom target wrapped
				in <Code>Pressable</Code>.
			</P>
			<H3>Default</H3>
			<MenuTrigger>
				<Button aria-label="Actions">Actions</Button>
				<Menu onAction={(key) => setLastAction(String(key))}>
					<MenuItem id="rename">Rename</MenuItem>
					<MenuItem id="duplicate">Duplicate</MenuItem>
					<MenuItem id="archive">Archive</MenuItem>
					<MenuItem id="delete">Delete</MenuItem>
				</Menu>
			</MenuTrigger>
			<H3>Quiet icon-only</H3>
			<MenuTrigger>
				<Button variant="quiet" aria-label="Actions">
					<DotsHorizontal />
				</Button>
				<Menu onAction={(key) => setLastAction(String(key))}>
					<MenuItem id="rename">Rename</MenuItem>
					<MenuItem id="duplicate">Duplicate</MenuItem>
					<MenuItem id="archive">Archive</MenuItem>
					<MenuItem id="delete">Delete</MenuItem>
				</Menu>
			</MenuTrigger>
			<H3>Disabled</H3>
			<Flex row alignItems="center" gap={4}>
				<MenuTrigger>
					<Button isDisabled>Actions</Button>
					<Menu onAction={(key) => setLastAction(String(key))}>
						<MenuItem id="rename">Rename</MenuItem>
					</Menu>
				</MenuTrigger>
				<MenuTrigger>
					<Button variant="quiet" isDisabled aria-label="Actions">
						<DotsHorizontal />
					</Button>
					<Menu onAction={(key) => setLastAction(String(key))}>
						<MenuItem id="rename">Rename</MenuItem>
					</Menu>
				</MenuTrigger>
			</Flex>
			{lastAction ? <P>Last action: {lastAction}</P> : null}
			<H3>Context menus and custom triggers</H3>
			<P>
				Use <Code>trigger="contextMenu"</Code> with the same <Code>Menu</Code>{" "}
				and <Code>MenuItem</Code>. Maui directly re-exports React Aria’s{" "}
				<Code>Pressable</Code> to connect a custom target to the trigger.
				Maui <Code>Button</Code> already handles this wiring.
			</P>
			<CodeBlock lang="tsx">{`import { MenuTrigger, Menu, MenuItem, Pressable } from "@tanishqkancharla/maui"

<MenuTrigger trigger="contextMenu">
  <Pressable>
    <div role="button" tabIndex={0}>Report.pdf</div>
  </Pressable>
  <Menu aria-label="File actions" onAction={handleAction}>
    <MenuItem id="rename">Rename</MenuItem>
    <MenuItem id="delete">Delete</MenuItem>
  </Menu>
</MenuTrigger>`}</CodeBlock>
			<P>
				<Code>Pressable</Code> adds behavior without styling or an extra DOM
				wrapper. Its single child needs an interactive semantic element or
				ARIA role. Custom components must forward their ref and spread props
				onto that element; give custom targets a visible keyboard focus style.
			</P>
			<P>
				React Aria handles right-click, touch long-press, and OS or screen-reader
				context-menu commands. Keep a visible Actions button offering the same
				actions, and preserve native browser menus on editable content and links
				when needed. The popup currently keeps the dropdown’s 6px offset and
				minimum width equal to the target width.
			</P>
		</Prose>
	)
}
