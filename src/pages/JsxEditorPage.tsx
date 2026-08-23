import { style, useStyles } from "purse-styles"
import { JsxEditor } from "../apps/JsxEditor/JsxEditor"
import { Text } from "../components/Text"
import { flex } from "../tokens/layout"
import { spacing } from "../tokens/spacing"

export function JsxEditorPage() {
	const className = useStyles(pageClass)

	return (
		<div className={className}>
			<Text size="sm" color="lowContrast">
				Live JSX preview. Maui components are in scope — type {"<"} for
				autocomplete.
			</Text>
			<JsxEditor />
		</div>
	)
}

const pageClass = style(flex({ direction: "column", gap: 4 }), {
	height: "100%",
	minHeight: 0,
	paddingBottom: spacing.value(4),
})
