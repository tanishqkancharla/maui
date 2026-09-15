import { useState } from "react"
import { Button } from "../components/Button"
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
				trigger is a Maui <code>Button</code>.
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
		</Prose>
	)
}
