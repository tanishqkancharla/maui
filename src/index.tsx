import React, { useRef } from "react";
import { useSwitch } from "react-aria";
import ReactDOM from "react-dom";
import { useToggleState } from "react-stately";

export function add(x: number, y: number) {
	return x + y;
}

function H1(props: { children: string }) {
	return <h1>{props.children}</h1>;
}

function H2(props: { children: string }) {
	return <h2>{props.children}</h2>;
}

function H3(props: { children: string }) {
	return <h3>{props.children}</h3>;
}

function P(props: { children: string }) {
	return <p>{props.children}</p>;
}

function Label(props: { children: string }) {
	return <label>{props.children}</label>;
}

function Switch(props: { label: string }) {
	const state = useToggleState();
	const ref = useRef(null);
	const { inputProps } = useSwitch({}, state, ref);

	return (
		<label className="switch">
			<input {...inputProps} className="switch-input" ref={ref} />
			<span className="switch-toggle"></span>
			<span className="switch-label">{props.label}</span>
		</label>
	);
}

type PaddingProps = {
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
	x?: number;
	y?: number;
	xy?: number;
	children?: React.ReactNode;
};

function Padding(props: PaddingProps) {
	const paddingTop = props.top || props.y || props.xy || 0;
	const paddingLeft = props.left || props.x || props.xy || 0;
	const paddingRight = props.right || props.x || props.xy || 0;
	const paddingBottom = props.bottom || props.y || props.xy || 0;

	return (
		<div style={{ paddingTop, paddingLeft, paddingRight, paddingBottom }}>
			{props.children}
		</div>
	);
}

type FlexProps =
	| {
			row?: undefined;
			column: boolean;
			children: React.ReactNode;
	  }
	| {
			row: boolean;
			column?: undefined;
			children: React.ReactNode;
	  };

function Flex(props: FlexProps) {
	const direction = props.column ? "column" : "row";

	return (
		<div style={{ display: "flex", flexDirection: direction }}>
			{props.children}
		</div>
	);
}

type GapProps = {
	width?: number;
	height?: number;
};

function Gap(props: GapProps) {
	return <div style={props} />;
}

function Button(props: { children: React.ReactNode }) {
	return <button>{props.children}</button>;
}

function Index() {
	return (
		<Flex column>
			<Padding xy={10}>
				<Flex row>
					<Button>Action Button</Button>
					<Gap width={10} />
					<Button>Some really long button</Button>
					<Gap width={10} />
					<Button>Button</Button>
				</Flex>
				<H1>Heading 1</H1>
				<H2>Heading 2</H2>
				<H3>Heading 3</H3>
				<P>
					There are 12 steps in each scale. Each step was designed for at least
					one specific use case. This table is a simple overview of the most
					common use case for each step. However, there are many exceptions and
					caveats to factor in, which are covered in further detail below.
				</P>
				<div>
					<Switch label="Switch" />
				</div>
			</Padding>
		</Flex>
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
