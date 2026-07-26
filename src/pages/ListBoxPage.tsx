import { useState } from "react"
import type { Selection } from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { ListBox, ListBoxItem } from "../components/ListBox"
import { Prose } from "../components/Prose"
import { H2, P } from "../components/Typography"
import { radius } from "../tokens/radius"
import { shadow } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"

export function ListBoxPage() {
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["one"]))
	const panelClassName = useStyles(panelStyle)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>List box</H2>
			<P>A persistent list of options that supports selection.</P>
			<div className={panelClassName}>
				<ListBox
					aria-label="Example list box"
					selectedKeys={selectedKeys}
					selectionMode="single"
					onSelectionChange={setSelectedKeys}
					disallowEmptySelection
				>
					<ListBoxItem id="one">Item 1</ListBoxItem>
					<ListBoxItem id="two">Item 2</ListBoxItem>
					<ListBoxItem id="three">Item 3</ListBoxItem>
					<ListBoxItem id="four">Item 4</ListBoxItem>
				</ListBox>
			</div>
		</Prose>
	)
}

const panelStyle = style(
	shadow.subtle,
	radius.md,
	spacing.padding({ all: 2 }),
	{
		maxWidth: "240px",
	},
)
