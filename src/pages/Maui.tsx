import type React from "react"
import { useState } from "react"
import { ActionButton, Button } from "../components/Button"
import { Checkbox } from "../components/Checkbox"
import { Dialog } from "../components/Dialog"
import { FuzzyString } from "../components/FuzzyString"
import { Icons } from "../components/Icons"
import { QuietTextField, TextField } from "../components/Input"
import { ListBox, MenuItem } from "../components/Menu"
import { Overlay } from "../components/Overlay"
import { Switch } from "../components/Switch"
import { Blockquote, H1, H2, H3, Link, P } from "../components/Typography"
import { Divider, Flex, Gap, Padding, Spacer } from "../components/Utils"
import { fuzzyMatch } from "../utils/fuzzyMatch"

export function Maui() {
	const [switchState, setSwitchState] = useState(false)
	const [checkboxState, setCheckboxState] = useState(false)
	const [selectedMenuItem, setSelectedMenuItem] = useState("one")
	const [textValue, setTextValue] = useState("")
	const [quietTextValue, setQuietTextValue] = useState("")
	const [dialogOpen, setDialogOpen] = useState(false)
	const [overlayOpen, setOverlayOpen] = useState(false)
	const fuzzyDemo = fuzzyMatch("fz", "FuzzyString")

	return (
		<div>
			<ColorTokens />

			<Divider />

			<H1>Maui</H1>
			<P>
				Maui is a growing design system of reusable components. This page is now
				the main app surface and showcases every component in the library.
			</P>

			<Divider />

			<Section title="Buttons">
				<Flex row alignItems="center" gap={10}>
					<Button>Button</Button>
					<ActionButton>Action Button</ActionButton>
					<Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
					<Button onClick={() => setOverlayOpen(true)}>Open Overlay</Button>
				</Flex>
			</Section>

			<Section title="Typography">
				<H1>Heading 1</H1>
				<H2>Heading 2</H2>
				<H3>Heading 3</H3>
				<P>
					Paragraph text supports inline links like{" "}
					<Link href="https://open-ui.org">Open UI</Link>.
				</P>
				<Blockquote>
					A blockquote gives longer cited or emphasized text a calm, accented
					presentation.
				</Blockquote>
			</Section>

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
				</Flex>
			</Section>

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

			<Section title="Utility components">
				<Flex column gap={12}>
					<div>
						<strong>FuzzyString: </strong>
						{fuzzyDemo && <FuzzyString match={fuzzyDemo} />}
					</div>
					<Flex row alignItems="center" gap={8}>
						<Icons.Check />
						<span>Icons.Check</span>
					</Flex>
				</Flex>
			</Section>

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

const colorTokenGroups = [
	{
		name: "Accent",
		tokens: ["accent-color", ...rangeTokens("accent")],
	},
	{
		name: "Sand",
		tokens: rangeTokens("sand"),
	},
] as const

function rangeTokens(prefix: string) {
	return Array.from({ length: 12 }, (_, index) => `${prefix}-${index + 1}`)
}

function ColorTokens() {
	return (
		<section>
			<H2>Color Tokens</H2>
			<P>
				The main tokens are the solid accent and sand scales from
				<code> src/style.css</code>. There are also alpha variants
				(<code>--accent-A1</code> through <code>--accent-A12</code> and
				<code> --sand-A1</code> through <code>--sand-A12</code>) for overlays,
				states, and subtle surfaces.
			</P>

			<Flex row gap={40} style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
				{colorTokenGroups.map((group) => (
					<div key={group.name} style={{ minWidth: "180px" }}>
						<H3>{group.name}</H3>
						<Flex column gap={8}>
							{group.tokens.map((token) => (
								<ColorToken key={token} name={token} />
							))}
						</Flex>
					</div>
				))}
			</Flex>
		</section>
	)
}

function ColorToken(props: { name: string }) {
	return (
		<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
			<div
				style={{
					width: "28px",
					height: "18px",
					borderRadius: "5px",
					background: `var(--${props.name})`,
				}}
			/>
			<span>{`--${props.name}`}</span>
		</div>
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
