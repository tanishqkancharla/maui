import { useState } from "react"
import { Button } from "../components/Button"
import { Dialog } from "../components/Dialog"
import { Icons } from "../components/Icons"
import { Overlay } from "../components/Overlay"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"

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

			<H3>Primary</H3>
			<P>
				<code>variant="primary"</code> fills with step 9 of{" "}
				<code>variantColor</code> (a palette name, default{" "}
				<code>"accent"</code>). Quiet uses the same color at the 3.5%
				surface-wash mix.
			</P>
			<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
				<Button variant="primary">Save</Button>
				<Button variant="primary">
					<Icons.Plus />
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
				<Button variant="quiet" variantColor="accent">
					Quiet accent
				</Button>
				<Button variant="quiet" variantColor="blue">
					Quiet blue
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
			<Flex row alignItems="center" gap={4}>
				<Button variant="quiet">Button</Button>
				<Button variant="quiet">
					<Icons.Plus />
					Create
				</Button>
				<Button variant="quiet" aria-label="More actions">
					<Icons.DotsHorizontal />
				</Button>
			</Flex>

			<H3>Icons with text</H3>
			<Flex row alignItems="center" gap={4}>
				<Button>
					<Icons.Plus />
					Create
				</Button>
				<Button>
					Archive
					<Icons.Archive />
				</Button>
			</Flex>

			<H3>Icon only</H3>
			<P>Icon-only buttons need an accessible label that describes the action.</P>
			<Flex row alignItems="center" gap={4}>
				<Button aria-label="Search">
					<Icons.Search />
				</Button>
				<Button aria-label="More actions">
					<Icons.DotsHorizontal />
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
