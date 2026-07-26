import { useState } from "react"
import { Button } from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { Menu, MenuItem, MenuTrigger } from "../components/Menu"
import { Prose } from "../components/Prose"
import { H2, P } from "../components/Typography"
import { backgroundColor } from "../tokens/background"
import { focusRing } from "../tokens/focusRing"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

export function MenuPage() {
	const [lastAction, setLastAction] = useState<string>()
	const triggerClassName = useStyles(triggerStyle)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Menu</H2>
			<P>A triggered collection of actions that opens in a popover.</P>
			<MenuTrigger>
				<Button className={triggerClassName}>Actions</Button>
				<Menu onAction={(key) => setLastAction(String(key))}>
					<MenuItem id="rename">Rename</MenuItem>
					<MenuItem id="duplicate">Duplicate</MenuItem>
					<MenuItem id="archive">Archive</MenuItem>
					<MenuItem id="delete">Delete</MenuItem>
				</Menu>
			</MenuTrigger>
			{lastAction ? <P>Last action: {lastAction}</P> : null}
		</Prose>
	)
}

const triggerStyle = style(
	text("sm", 400, "highContrast"),
	focusRing("&:focus-visible", shadowVars.subtle),
	radius.sm,
	spacing.padding({ x: 4, y: 2 }),
	shadow.subtle,
	{
		border: "none",
		background: "transparent",
		"&:hover, &[data-pressed]": {
			background: backgroundColor.elementHover,
		},
	},
)
