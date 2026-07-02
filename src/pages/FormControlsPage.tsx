import { useState } from "react"
import { Checkbox } from "../components/Checkbox"
import {
	NumberField,
	QuietTextField,
	SearchField,
	TextField,
} from "../components/Input"
import { RadioOption, RadioOptionGroup } from "../components/Radio"
import { Slider } from "../components/Slider"
import { Switch } from "../components/Switch"
import { H2 } from "../components/Typography"
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

	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Form controls</H2>
			<Flex column gap={12}>
				<div style={{ maxWidth: "240px" }}>
					<TextField
						aria-label="Example text field"
						placeholder="TextField"
						value={textValue}
						onChange={setTextValue}
					/>
				</div>
				<div style={{ maxWidth: "240px" }}>
					<SearchField
						aria-label="Example search field"
						placeholder="SearchField"
						value={searchValue}
						onChange={setSearchValue}
					/>
				</div>
				<div style={{ maxWidth: "240px" }}>
					<NumberField
						aria-label="Example number field"
						value={numberValue}
						onChange={setNumberValue}
						minValue={0}
						maxValue={10}
					/>
				</div>
				<div style={{ maxWidth: "240px" }}>
					<QuietTextField
						aria-label="Quiet text field"
						placeholder="QuietTextField"
						value={quietTextValue}
						onChange={setQuietTextValue}
					/>
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
		</section>
	)
}
