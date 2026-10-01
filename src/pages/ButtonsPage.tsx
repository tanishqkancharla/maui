import { useState } from "react"
import { Button } from "../components/Button"
import { Code } from "../components/Code"
import { Dialog } from "../components/Dialog"
import { Overlay } from "../components/Overlay"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { Archive, DotsHorizontal, Plus, Search } from "../icons"

import { colorNames, colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"

export function ButtonsPage() {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [overlayOpen, setOverlayOpen] = useState(false)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Buttons</H2>
			<H3>Text</H3>
			<Flex row alignItems="center" gap={4}>
				<Button>Button</Button>
				<Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
				<Button onClick={() => setOverlayOpen(true)}>Open Overlay</Button>
			</Flex>

			<H3>Disabled</H3>
			<P>
				<Code>isDisabled</Code> is React Aria’s disabled prop. It sets the
				native <Code>disabled</Code> attribute — there is no parallel{" "}
				<Code>disabled</Code> React prop. Hover and press fills do not apply.
			</P>
			<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
				<Button isDisabled>Button</Button>
				<Button variant="primary" isDisabled>
					Save
				</Button>
				<Button variant="quiet" isDisabled>
					Quiet
				</Button>
				<Button variant="primary" variantColor="blue" isDisabled>
					Blue
				</Button>
				<Button variant="quiet" variantColor="accent" isDisabled>
					Quiet accent
				</Button>
				<Button isDisabled>
					<Plus />
					Create
				</Button>
				<Button isDisabled aria-label="Search">
					<Search />
				</Button>
			</Flex>

			<H3>Primary</H3>
			<P>
				<Code>variant="primary"</Code> fills with step 9 of{" "}
				<Code>variantColor</Code> (a palette name, default <Code>"accent"</Code>
				). Pass a hex or <Code>rgb()</Code> string to use that color as the fill
				(alpha is dropped). Primary buttons use a stronger inset highlight and a
				tight edge tinted from the fill.
			</P>
			<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
				<Button variant="primary">Save</Button>
				<Button variant="primary">
					<Plus />
					Create
				</Button>
				<Button variant="primary" variantColor="blue">
					Blue
				</Button>
				<Button variant="primary" variantColor="red">
					Red
				</Button>
				<Button variant="primary" variantColor="orange">
					Orange
				</Button>
			</Flex>
			<Flex
				row
				alignItems="center"
				gap={4}
				style={{ flexWrap: "wrap", marginTop: "12px" }}
			>
				<Button variant="primary" variantColor="#6366f1">
					#6366f1
				</Button>
				<Button variant="primary" variantColor="#f5d90a">
					#f5d90a
				</Button>
				<Button variant="primary" variantColor="rgb(219, 68, 55)">
					rgb(219, 68, 55)
				</Button>
			</Flex>
			<Flex
				row
				alignItems="center"
				gap={3}
				style={{ flexWrap: "wrap", marginTop: "12px" }}
			>
				{colorNames.map((name) => (
					<Button key={name} variant="primary" variantColor={name}>
						{name}
					</Button>
				))}
			</Flex>

			<H3>Quiet</H3>
			<P>
				<Code>variant="quiet"</Code> has no fill. <Code>variantColor</Code>{" "}
				tints the label and icon. Hover and press mix <Code>grayAlpha[9]</Code>{" "}
				(or that color’s alpha 9) into transparent. Hover uses the shared 3.5%
				control wash; press remains stronger.
			</P>
			<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
				<Button variant="quiet">Button</Button>
				<Button variant="quiet">
					<Plus />
					Create
				</Button>
				<Button variant="quiet" aria-label="More actions">
					<DotsHorizontal />
				</Button>
				<Button variant="quiet" variantColor="accent">
					Quiet accent
				</Button>
				<Button variant="quiet" variantColor="blue">
					Quiet blue
				</Button>
				<Button variant="quiet" variantColor="#6366f1">
					Quiet #6366f1
				</Button>
			</Flex>

			<H3>Icons with text</H3>
			<Flex row alignItems="center" gap={4}>
				<Button>
					<Plus />
					Create
				</Button>
				<Button>
					Archive
					<Archive />
				</Button>
			</Flex>

			<H3>Icon only</H3>
			<P>
				Icon-only buttons need an accessible label that describes the action.
			</P>
			<Flex row alignItems="center" gap={4}>
				<Button aria-label="Search">
					<Search />
				</Button>
				<Button aria-label="More actions">
					<DotsHorizontal />
				</Button>
			</Flex>

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
								background: colors.gray[2],
								border: `1px solid ${borderColor.outline}`,
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
		</Prose>
	)
}
