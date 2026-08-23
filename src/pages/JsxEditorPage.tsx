import { style, useStyles } from "purse-styles"
import { JsxEditor } from "../apps/JsxEditor/JsxEditor"
import { Kbd } from "../components/Code"
import { Text } from "../components/Text"
import { flex } from "../tokens/layout"
import { spacing } from "../tokens/spacing"

export function JsxEditorPage() {
	const className = useStyles(pageClass)
	const hintClassName = useStyles(hintClass)

	return (
		<div className={className}>
			<div className={hintClassName}>
				<Text size="sm" color="lowContrast">
					Live JSX preview. Maui components are in scope — type {"<"} for
					autocomplete. Press <Kbd>⌘</Kbd> <Kbd>S</Kbd> to format.
				</Text>
			</div>
			<JsxEditor />
		</div>
	)
}

const hintClass = style(flex({ direction: "row", align: "center", gap: 2 }), {
	flexShrink: 0,
	flexWrap: "wrap",
})

const pageClass = style(flex({ direction: "column", gap: 4 }), {
	height: "100%",
	minHeight: 0,
	overflow: "hidden",
	paddingBottom: spacing.value(4),
})
