import type React from "react"
import { useState } from "react"
import {
	Link as WouterLink,
	Redirect,
	Route,
	Router,
	Switch as WouterSwitch,
	useRoute,
} from "wouter"
import { useHashLocation } from "wouter/use-hash-location"
import { style, useStyles } from "purse-styles"
import { ActionButton, Button } from "../components/Button"
import { Checkbox } from "../components/Checkbox"
import { Dialog } from "../components/Dialog"
import { FuzzyString } from "../components/FuzzyString"
import { Icons } from "../components/Icons"
import {
	NumberField,
	QuietTextField,
	SearchField,
	TextField,
} from "../components/Input"
import { ListBox, MenuItem } from "../components/Menu"
import { Overlay } from "../components/Overlay"
import { RadioGroup } from "../components/Radio"
import { Slider } from "../components/Slider"
import { Switch } from "../components/Switch"
import {
	Blockquote,
	H1,
	H2,
	H3,
	Link as TypographyLink,
	P,
} from "../components/Typography"
import { Divider, Flex, Gap, Padding, Spacer } from "../components/Utils"
import { focusRing } from "../utils/focusRing"
import { fuzzyMatch } from "../utils/fuzzyMatch"
import { BackgroundColorPage } from "./style-tokens/BackgroundColorPage"
import { ColorPage } from "./style-tokens/ColorPage"
import { CornerRadiusPage } from "./style-tokens/CornerRadiusPage"
import { FocusRingPage } from "./style-tokens/FocusRingPage"
import { LayoutPage } from "./style-tokens/LayoutPage"
import { MotionPage } from "./style-tokens/MotionPage"
import { ShadowPage } from "./style-tokens/ShadowPage"
import { SizingPage } from "./style-tokens/SizingPage"
import { SpacingPage } from "./style-tokens/SpacingPage"
import { TextColorPage } from "./style-tokens/TextColorPage"

export function Maui() {
	return (
		<Router hook={useHashLocation}>
			<MauiContent />
		</Router>
	)
}

function MauiContent() {
	const [switchState, setSwitchState] = useState(false)
	const [checkboxState, setCheckboxState] = useState(false)
	const [selectedMenuItem, setSelectedMenuItem] = useState("one")
	const [textValue, setTextValue] = useState("")
	const [searchValue, setSearchValue] = useState("")
	const [numberValue, setNumberValue] = useState(3)
	const [radioValue, setRadioValue] = useState("one")
	const [sliderValue, setSliderValue] = useState(40)
	const [quietTextValue, setQuietTextValue] = useState("")
	const [dialogOpen, setDialogOpen] = useState(false)
	const [overlayOpen, setOverlayOpen] = useState(false)
	const fuzzyDemo = fuzzyMatch("fz", "FuzzyString")
	const shellClassName = useStyles(mauiShellClass)
	const contentClassName = useStyles(contentClass)

	return (
		<div className={shellClassName}>
			<MauiNavigation />

			<div className={contentClassName}>
				<WouterSwitch>
					<Route path="/">
						<Redirect to="/style-tokens/color" />
					</Route>

					<Route path="/style-tokens/color">
						<ColorPage />
					</Route>

					<Route path="/style-tokens/text-color">
						<TextColorPage />
					</Route>

					<Route path="/style-tokens/background-color">
						<BackgroundColorPage />
					</Route>

					<Route path="/style-tokens/corner-radius">
						<CornerRadiusPage />
					</Route>

					<Route path="/style-tokens/spacing">
						<SpacingPage />
					</Route>

					<Route path="/style-tokens/sizing">
						<SizingPage />
					</Route>

					<Route path="/style-tokens/shadows">
						<ShadowPage />
					</Route>

					<Route path="/style-tokens/motion">
						<MotionPage />
					</Route>

					<Route path="/style-tokens/focus-ring">
						<FocusRingPage />
					</Route>

					<Route path="/style-tokens/layout">
						<LayoutPage />
					</Route>

					<Route path="/components/buttons">
						<Section title="Buttons">
							<Flex row alignItems="center" gap={10}>
								<Button>Button</Button>
								<ActionButton>Action Button</ActionButton>
								<Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
								<Button onClick={() => setOverlayOpen(true)}>
									Open Overlay
								</Button>
							</Flex>
						</Section>
					</Route>

					<Route path="/components/typography">
						<Section title="Typography">
							<H1>Heading 1</H1>
							<H2>Heading 2</H2>
							<H3>Heading 3</H3>
							<P>
								Early computers were huge machines that filled whole rooms. People used
								punch cards and simple commands to help them solve math and business
								problems.
							</P>
							<P>
								Over time, computers became smaller, faster, and easier to use. They moved
								from labs into homes, phones, and schools, and now help people write,
								design, learn, and talk to each other. Paragraph text supports inline links
								like{" "}
								<TypographyLink href="https://open-ui.org">
									Open UI
								</TypographyLink>
								.
							</P>
							<Blockquote>
								A blockquote gives longer cited or emphasized text a calm,
								accented presentation.
							</Blockquote>
						</Section>
					</Route>

					<Route path="/components/form-controls">
						<Section title="Form controls">
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
								<div
									style={{
										maxWidth: "240px",
										padding: "6px 8px",
										borderRadius: "4px",
										background: "var(--sand-3)",
									}}
								>
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
								<RadioGroup
									label="Radio"
									aria-label="Example radio group"
									value={radioValue}
									onChange={setRadioValue}
									options={[
										{ label: "Option 1", value: "one" },
										{ label: "Option 2", value: "two" },
										{ label: "Option 3", value: "three" },
									]}
								/>
								<Slider
									label="Slider"
									value={sliderValue}
									onChange={setSliderValue}
									minValue={0}
									maxValue={100}
								/>
							</Flex>
						</Section>
					</Route>

					<Route path="/components/menu">
						<Section title="Menu">
							<div style={{ maxWidth: "240px" }}>
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
						</Section>
					</Route>

					<Route path="/components/layout-utilities">
						<Section title="Layout utilities">
							<Padding xy={12}>
								<div
									style={{
										border: "1px solid var(--sand-6)",
										borderRadius: "6px",
										padding: "12px",
									}}
								>
									<Flex row alignItems="center">
										<span>Flex</span>
										<Gap width={12} />
										<span>Gap</span>
										<Spacer />
										<span>Spacer</span>
									</Flex>
								</div>
							</Padding>
							<Divider />
						</Section>
					</Route>

					<Route path="/components/utilities">
						<Section title="Utility components">
							<Flex column gap={12}>
								<div>
									<strong>FuzzyString: </strong>
									{fuzzyDemo && <FuzzyString match={fuzzyDemo} />}
								</div>
								<Flex row alignItems="center" gap={8}>
									<Icons.Search />
									<span>Icons.Search</span>
								</Flex>
							</Flex>
						</Section>
					</Route>

					<Route>
						<Redirect to="/style-tokens/color" />
					</Route>
				</WouterSwitch>
			</div>

			{dialogOpen && (
				<Dialog onClickOutside={() => setDialogOpen(false)}>
					<H3>Dialog</H3>
					<P>Dialog composes Overlay and FocusScope into a modal surface.</P>
					<Button onClick={() => setDialogOpen(false)}>Close Dialog</Button>
				</Dialog>
			)}

			{overlayOpen && (
				<Overlay onClickOutside={() => setOverlayOpen(false)}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							height: "100%",
							background: "rgb(0 0 0 / 45%)",
						}}
					>
						<div
							style={{
								background: "var(--sand-2)",
								border: "1px solid var(--sand-6)",
								borderRadius: "6px",
								padding: "24px",
							}}
						>
							<H3>Overlay</H3>
							<P>Click outside this panel or press the button to dismiss it.</P>
							<Button onClick={() => setOverlayOpen(false)}>
								Close Overlay
							</Button>
						</div>
					</div>
				</Overlay>
			)}
		</div>
	)
}

const mauiShellClass = style({
	display: "grid",
	gridTemplateColumns: "180px minmax(0, 1fr)",
	gap: "32px",
	alignItems: "start",
	height: "100%",
	minHeight: 0,
	overflow: "hidden",
})

const contentClass = style({
	height: "100%",
	minHeight: 0,
	overflowY: "auto",
})

const navClass = style({
	height: "100%",
	minHeight: 0,
	overflowY: "auto",
	"& h2": {
		marginTop: 0,
	},
	"& ul": {
		listStyleType: "none",
		padding: 0,
		margin: 0,
	},
	"& li": {
		margin: 0,
	},
})

const navGroupClass = style({
	marginBottom: "20px",
})

const navGroupTitleClass = style({
	color: "var(--sand-10)",
	fontSize: "11px",
	letterSpacing: "0.04em",
	textTransform: "uppercase",
	marginBottom: "8px",
})

const navChildrenClass = style({
	paddingLeft: "12px !important",
})

const navLinkClass = style(focusRing(), {
	display: "block",
	padding: "3px 0",
	color: "var(--sand-11)",
	textDecoration: "none",
	"&:hover": {
		color: "var(--sand-12)",
	},
	"&:focus-visible": {
		color: "var(--accent-color)",
	},
	"&[aria-current='page']": {
		color: "var(--accent-color)",
	},
})

type NavGroup = {
	label: string
	children: NavItem[]
}

type NavItem = {
	label: string
	path: string
}

const navigation: NavGroup[] = [
	{
		label: "Style tokens",
		children: [
			{ label: "Color", path: "/style-tokens/color" },
			{ label: "Text", path: "/style-tokens/text-color" },
			{ label: "Background color", path: "/style-tokens/background-color" },
			{ label: "Corner radius", path: "/style-tokens/corner-radius" },
			{ label: "Spacing", path: "/style-tokens/spacing" },
			{ label: "Sizing", path: "/style-tokens/sizing" },
			{ label: "Shadows", path: "/style-tokens/shadows" },
			{ label: "Motion", path: "/style-tokens/motion" },
			{ label: "Focus ring", path: "/style-tokens/focus-ring" },
			{ label: "Layout", path: "/style-tokens/layout" },
		],
	},
	{
		label: "Components",
		children: [
			{ label: "Buttons", path: "/components/buttons" },
			{ label: "Typography", path: "/components/typography" },
			{ label: "Form controls", path: "/components/form-controls" },
			{ label: "Menu", path: "/components/menu" },
			{ label: "Layout utilities", path: "/components/layout-utilities" },
			{ label: "Utilities", path: "/components/utilities" },
		],
	},
]

function MauiNavigation() {
	const navClassName = useStyles(navClass)
	const groupClassName = useStyles(navGroupClass)
	const groupTitleClassName = useStyles(navGroupTitleClass)
	const childrenClassName = useStyles(navChildrenClass)

	return (
		<nav className={navClassName} aria-label="Maui sections">
			<H3>Maui</H3>
			<Gap height={12} />
			<ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				{navigation.map((group) => (
					<li className={groupClassName} key={group.label}>
						<div className={groupTitleClassName}>{group.label}</div>
						<ul className={childrenClassName}>
							{group.children.map((item) => (
								<NavLink key={item.path} item={item} />
							))}
						</ul>
					</li>
				))}
			</ul>
		</nav>
	)
}

function NavLink(props: { item: NavItem }) {
	const className = useStyles(navLinkClass)
	const [selected] = useRoute(props.item.path)

	return (
		<li>
			<WouterLink
				className={className}
				href={props.item.path}
				aria-current={selected ? "page" : undefined}
			>
				{props.item.label}
			</WouterLink>
		</li>
	)
}

function Section(props: { title: string; children: React.ReactNode }) {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>{props.title}</H2>
			{props.children}
		</section>
	)
}
