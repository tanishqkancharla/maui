import { useState } from "react"
import { ActionButton, Button } from "../components/Button"
import { Dialog } from "../components/Dialog"
import { Overlay } from "../components/Overlay"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
export function ButtonsPage() {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [overlayOpen, setOverlayOpen] = useState(false)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Buttons</H2>
			<Flex row alignItems="center" gap={10}>
				<Button>Button</Button>
				<ActionButton>Action Button</ActionButton>
				<Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
				<Button onClick={() => setOverlayOpen(true)}>Open Overlay</Button>
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
