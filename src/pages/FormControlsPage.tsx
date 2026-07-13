import { useState } from "react"
import { Checkbox } from "../components/Checkbox"
import {
	NumberField,
	QuietTextField,
	SearchField,
	TextField,
} from "../components/Input"
import { RadioOption, RadioOptionGroup } from "../components/Radio"
import { Prose } from "../components/Prose"
import { Slider } from "../components/Slider"
import { Select, SelectItem } from "../components/Select"
import { Switch } from "../components/Switch"
import { H2, Label } from "../components/Typography"
import { Flex } from "../components/Utils"

export function FormControlsPage() {
	const [switchState, setSwitchState] = useState(false)
	const [checkboxState, setCheckboxState] = useState(false)
	const [textValue, setTextValue] = useState("")
	const [searchValue, setSearchValue] = useState("")
	const [numberValue, setNumberValue] = useState(3)
	const [radioValue, setRadioValue] = useState("one")
	const [sliderValue, setSliderValue] = useState(40)
	const [quietTextValue, setQuietTextValue] = useState("")
	const [selectValue, setSelectValue] = useState<string | number | null>(null)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Form controls</H2>
			<Flex column gap={12}>
				<Flex column gap={4} style={{ maxWidth: "240px" }}>
					<Label htmlFor="text-field">Text field</Label>
					<TextField
						id="text-field"
						placeholder="TextField"
						value={textValue}
						onChange={setTextValue}
					/>
				</Flex>
				<Flex column gap={4} style={{ maxWidth: "240px" }}>
					<Label htmlFor="search-field">Search field</Label>
					<SearchField
						id="search-field"
						placeholder="SearchField"
						value={searchValue}
						onChange={setSearchValue}
					/>
				</Flex>
				<Flex column gap={4} style={{ maxWidth: "240px" }}>
					<Label htmlFor="number-field">Number field</Label>
					<NumberField
						id="number-field"
						value={numberValue}
						onChange={setNumberValue}
						minValue={0}
						maxValue={10}
					/>
				</Flex>
				<Flex column gap={4} style={{ maxWidth: "240px" }}>
					<Label htmlFor="quiet-text-field">Quiet text field</Label>
					<QuietTextField
						id="quiet-text-field"
						placeholder="QuietTextField"
						value={quietTextValue}
						onChange={setQuietTextValue}
					/>
				</Flex>
				<div style={{ maxWidth: "240px" }}>
					<Select
						label="Select field"
						placeholder="Choose a fruit"
						value={selectValue}
						onChange={setSelectValue}
					>
						<SelectItem id="apple">Apple</SelectItem>
						<SelectItem id="banana">Banana</SelectItem>
						<SelectItem id="orange">Orange</SelectItem>
						<SelectItem id="pear">Pear</SelectItem>
						<SelectItem id="strawberry">Strawberry</SelectItem>
					</Select>
				</div>
				<Switch
					selected={switchState}
					onChange={setSwitchState}
					label="Switch"
				/>
				<Checkbox
					checked={checkboxState}
					setChecked={setCheckboxState}
					label="Checkbox"
				/>
				<RadioOptionGroup
					label="Radio"
					aria-label="Example radio group"
					value={radioValue}
					onChange={setRadioValue}
				>
					<RadioOption value="one">Option 1</RadioOption>
					<RadioOption value="two">Option 2</RadioOption>
					<RadioOption value="three">Option 3</RadioOption>
				</RadioOptionGroup>
				<Slider
					label="Slider"
					value={sliderValue}
					onChange={setSliderValue}
					minValue={0}
					maxValue={100}
				/>
			</Flex>
		</Prose>
	)
}
