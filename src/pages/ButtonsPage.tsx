import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Code } from "../components/Code"
import {
	Dialog,
	DialogActions,
	DialogBody,
	DialogTitle,
} from "../components/Dialog"
import { Overlay } from "../components/Overlay"
import { Prose } from "../components/Prose"
import { Text } from "../components/Text"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { Archive, DotsHorizontal, Plus, Search } from "../icons"

import { colorNames, colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"

export function ButtonsPage() {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [overlayOpen, setOverlayOpen] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [saveCount, setSaveCount] = useState(0)

	useEffect(() => {
		if (!isSaving) return
		const timeout = setTimeout(() => {
			setIsSaving(false)
			setSaveCount((count) => count + 1)
		}, 2000)
		return () => clearTimeout(timeout)
	}, [isSaving])

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Buttons</H2>
			<H3>Text</H3>
			<Flex row alignItems="center" gap={4}>
				<Button>Button</Button>
				<Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
				<Button onClick={() => setOverlayOpen(true)}>Open Overlay</Button>
			</Flex>

			<H3>Small</H3>
			<P>
				<Code>size="sm"</Code> creates a compact button for dense interfaces.
			</P>
			<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
				<Button size="sm">Button</Button>
				<Button size="sm" variant="primary">
					Save
				</Button>
				<Button size="sm" variant="quiet">
					Quiet
				</Button>
				<Button size="sm">
					<Plus />
					Create
				</Button>
				<Button size="sm" aria-label="Search">
					<Search />
				</Button>
			</Flex>

			<H3>Disabled</H3>
			<P>
				<Code>isDisabled</Code> is React Aria’s disabled prop. It sets the
				native <Code>disabled</Code> attribute — there is no parallel{" "}
				<Code>disabled</Code> React prop. The hover fill does not apply.
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

			<H3>Pending</H3>
			<P>
				<Code>isPending</Code> shows an activity indicator beside the label,
				keeps the button’s color and focus, and prevents repeat activation. Use{" "}
				<Code>pendingLabel</Code> for visible progress text; otherwise the
				original children stay visible.
			</P>
			<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
				<Button isPending>Submitting</Button>
				<Button variant="primary" isPending pendingLabel="Saving…">
					Save
				</Button>
				<Button variant="quiet" isPending pendingLabel="Syncing…">
					Sync
				</Button>
				<Button
					variant="primary"
					variantColor="blue"
					isPending
					pendingLabel="Uploading…"
				>
					Upload
				</Button>
				<Button size="sm" isPending pendingLabel="Creating…">
					<Plus />
					Create
				</Button>
			</Flex>
			<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
				<Button
					variant="primary"
					isPending={isSaving}
					pendingLabel="Saving changes…"
					onPress={() => setIsSaving(true)}
				>
					Save changes
				</Button>
				<Text size="sm" color="lowContrast" role="status">
					{isSaving
						? "Saving for two seconds…"
						: saveCount > 0
							? `Saved ${saveCount} ${saveCount === 1 ? "time" : "times"}. Try again.`
							: "Click to try the pending state."}
				</Text>
			</Flex>

			<H3>Primary</H3>
			<P>
				<Code>variant="primary"</Code> fills with step 9 of{" "}
				<Code>variantColor</Code> (a palette name, default <Code>"accent"</Code>
				). Pass a hex or <Code>rgb()</Code> string to use that color as the fill
				(alpha is dropped). The fill is a subtle diagonal gradient from a
				slightly darker, warmer shade of that color, and the lift shadow is
				tinted from it; the lift is half as strong in dark mode. The 0.5px edge
				is alpha step 6 of that color in light mode and a near-black tint of the
				fill in dark mode. Dark mode adds a 0.5px white top highlight (15% on
				primary, 9% on default buttons). Hover adds a white sheen at the top.
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
				tints the label and icon. Hover mixes <Code>grayAlpha[9]</Code> (or that
				color’s alpha 9) into transparent using the shared 3.5% control wash.
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

			<Dialog isOpen={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogTitle>Save changes?</DialogTitle>
				<DialogBody>
					<P>
						Your updates are ready to save. You can cancel and continue editing.
					</P>
				</DialogBody>
				<DialogActions>
					<Button slot="close">Cancel</Button>
					<Button variant="primary" onPress={() => setDialogOpen(false)}>
						Save
					</Button>
				</DialogActions>
			</Dialog>

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
