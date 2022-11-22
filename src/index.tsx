import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CliExperiment } from "./CliExperiment";
import { ActionButton, Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
import { Input } from "./components/Input";
import { Listbox, MenuItem } from "./components/Menu";
import { Switch } from "./components/Switch";
import { Blockquote, H1, H2, H3, P } from "./components/Typography";
import { Flex, Gap, Padding } from "./components/Utils";

function Index() {
	const [switchState, setSwitchState] = useState(false);
	const [checkboxState, setCheckboxState] = useState(false);

	return (
		<Padding xy={30}>
			<Flex row>
				<Button>Button</Button>
				<Gap width={10} />
				<Button>Some really long button</Button>
				<Gap width={10} />
				<Button>Button</Button>
			</Flex>
			<Gap height={10} />
			<ActionButton>Action Button</ActionButton>
			<H1>Heading 1</H1>
			<H2>Heading 2</H2>
			<H3>Heading 3</H3>
			<P>
				There are 12 steps in each scale. Each step was designed for at least
				one specific use case. This table is a simple overview of the most
				common use case for each step. However, there are many exceptions and
				caveats to factor in, which are covered in further detail below.
			</P>
			<Blockquote>
				There are 12 steps in each scale. Each step was designed for at least
				one specific use case. This table is a simple overview of the most
				common use case for each step. However, there are many exceptions and
				caveats to factor in, which are covered in further detail below.
			</Blockquote>
			<div>
				<Switch
					selected={switchState}
					onChange={() => setSwitchState(!switchState)}
					label="Switch"
				/>
			</div>
			<Flex column>
				<Checkbox
					checked={checkboxState}
					setChecked={setCheckboxState}
					label="Checkbox"
				/>
			</Flex>
			<H3>Input</H3>
			<Input aria-label="Example" />
			<H3>Cli</H3>
			<CliExperiment />
			<H3>Menu</H3>
			<Listbox>
				<MenuItem>Item 1</MenuItem>
				<MenuItem>Item 2</MenuItem>
				<MenuItem>Item 3</MenuItem>
				<MenuItem>Item 4</MenuItem>
				<MenuItem>Item 5</MenuItem>
			</Listbox>
		</Padding>
	);
}

function run() {
	const container = document.createElement("main");
	document.body.appendChild(container);
	ReactDOM.render(<Index />, container);
}

if (typeof window !== "undefined") {
	// If in browser context
	run();
}
