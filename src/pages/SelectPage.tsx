import { useState } from "react"
import { Select, SelectItem } from "../components/Select"
import { Prose } from "../components/Prose"
import { H2, P } from "../components/Typography"

export function SelectPage() {
	const [value, setValue] = useState<string | number | null>(null)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Select</H2>
			<P>A trigger and popover containing a single-selection list box.</P>
			<div style={{ maxWidth: "240px" }}>
				<Select
					label="Favorite fruit"
					placeholder="Choose a fruit"
					value={value}
					onChange={setValue}
				>
					<SelectItem id="apple">Apple</SelectItem>
					<SelectItem id="banana">Banana</SelectItem>
					<SelectItem id="orange">Orange</SelectItem>
					<SelectItem id="pear">Pear</SelectItem>
				</Select>
			</div>
		</Prose>
	)
}
