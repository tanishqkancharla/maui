import { useState } from "react"
import { Button } from "../components/Button"
import { Dialog } from "../components/Dialog"
import { P } from "../components/Typography"
import { Flex, Gap } from "../components/Utils"
import { useCommand } from "../hooks/useCommand"
import { FocusScope } from "../hooks/useFocus"
import { useTupleDatabase } from "../hooks/useTupleDatabase"
import { focusActions } from "../UIDatabase/Focus"
import { useUIDatabase } from "../UIDatabase/UIDatabase"

function ActiveFocusView() {
	const db = useUIDatabase()
	const currentFocus = useTupleDatabase(db, ["activeFocus"]) as string[]

	return (
		<div className="h-10 text-sand-12 font-sans text-sm">
			Active Focus: [{currentFocus?.join(", ")}]
		</div>
	)
}

export function ManagedFocusScopesDemo() {
	const [dialogOpen, setDialogOpen] = useState(false)
	const db = useUIDatabase()

	useCommand({
		shortcut: "Tab",
		execute: () => {
			focusActions.moveToNextFocus(db)
		},
	})

	useCommand({
		shortcut: "Shift-Tab",
		execute: () => {
			focusActions.moveToPreviousFocus(db)
		},
	})

	return (
		<Flex column gap={8}>
			<ActiveFocusView />
			<Gap height={8} />
			<div
				style={{
					padding: 16,
					border: "1px solid gray",
					borderRadius: 4,
					display: "flex",
					flexDirection: "column",
					gap: 8,
				}}
			>
				<P>Autofocus and contain: no-contain</P>
				<FocusScope autoFocus>
					<Button>Button 1</Button>
					<Button>Button 2</Button>
					<Button>Button 3</Button>
				</FocusScope>
			</div>
			<div
				style={{
					padding: 16,
					border: "1px solid gray",
					borderRadius: 4,
					display: "flex",
					flexDirection: "column",
					gap: 8,
				}}
			>
				<P>Contain: lock</P>
				<FocusScope containBehavior="lock">
					<Button>Button 1</Button>
					<Button>Button 2</Button>
					<Button>Button 3</Button>
				</FocusScope>
			</div>
			<div
				style={{
					padding: 16,
					border: "1px solid gray",
					borderRadius: 4,
					display: "flex",
					flexDirection: "column",
					gap: 8,
				}}
			>
				<P>Contain: cycle</P>
				<FocusScope containBehavior="cycle">
					<Button>Button 1</Button>
					<Button>Button 2</Button>
					<Button>Button 3</Button>
				</FocusScope>
			</div>
			<div
				style={{
					padding: 16,
					border: "1px solid gray",
					borderRadius: 4,
					display: "flex",
					flexDirection: "column",
					gap: 8,
				}}
			>
				<Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
				{dialogOpen && (
					<Dialog onClickOutside={() => setDialogOpen(false)}>
						<div className="flex flex-col gap-2">
							<Button>Button 1</Button>
							<Button>Button 2</Button>
							<Button>Button 3</Button>
						</div>
					</Dialog>
				)}
			</div>
		</Flex>
	)
}
