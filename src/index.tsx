import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ActionButton, Button } from "./Button";
import { CliExperiment } from "./CliExperiment";
import { Input } from "./Input";
import { Listbox, MenuItem } from "./Menu";
import { Switch } from "./Switch";
import { Blockquote, H1, H2, H3, P } from "./Typography";
import { Flex, Gap, Padding } from "./Utils";

type CheckboxProps = {
	selected: boolean;
};

export function Checkbox(props: CheckboxProps) {}

function Index() {
	const [toggleState, setToggleState] = useState(false);
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
					selected={toggleState}
					onToggle={() => setToggleState(!toggleState)}
					label="Switch"
				/>
			</div>
			<H3>Input</H3>
			<Input />
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
	window.addEventListener("load", function () {
		run();
	});
}
