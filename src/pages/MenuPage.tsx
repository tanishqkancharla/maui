import { useState } from "react"
import { style, useStyles } from "purse-styles"
import { ListBox, MenuItem } from "../components/Menu"
import { Prose } from "../components/Prose"
import { H2 } from "../components/Typography"
import { shadow } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"

export function MenuPage() {
	const [selectedMenuItem, setSelectedMenuItem] = useState("one")
	const menuPanelClassName = useStyles(menuPanelClass)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Menu</H2>
			<div className={menuPanelClassName}>
				<ListBox
					aria-label="Example menu"
					selectedKeys={[selectedMenuItem]}
					selectionMode="single"
					onAction={(key) => setSelectedMenuItem(String(key))}
					disallowEmptySelection
				>
					<MenuItem key="one">Item 1</MenuItem>
					<MenuItem key="two">Item 2</MenuItem>
					<MenuItem key="three">Item 3</MenuItem>
					<MenuItem key="four">Item 4</MenuItem>
				</ListBox>
			</div>
		</Prose>
	)
}

const menuPanelClass = style(shadow.border, spacing.padding({ all: 2 }), {
	maxWidth: "240px",
	background: "var(--gray-1)",
	borderRadius: "6px",
})
