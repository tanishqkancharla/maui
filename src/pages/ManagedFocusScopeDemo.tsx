import { useState } from "react"
import { Button } from "../components/Button"
import { Dialog } from "../components/Dialog"
import { Link, P } from "../components/Typography"
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
			<P>
				Like the previous demo, the demo here is not as impressive, but it
				demonstrates how to extend the previous ideas to incorporate common
				focus management patterns.
			</P>
			<P>
				By using a global store for the focus element tree, with root nodes
				being focusable elements, and parent nodes being "focus scopes" that
				store parameters like their contain behavior, we can create handlers for
				"tab" and "shift-tab" that will inspect the current focus scope and
				based on it's contain behavior, set the focus state to the appropriate
				element.
			</P>
			<P>
				These semantics can be elegantly represented in
				<Link href="https://github.com/ccorcos/tuple-database">
					tuple-database
				</Link>
				. The active focus key below represents the actual key of that element
				into the focus database. This representation lets us make efficient
				scans for i.e. the first element in the current scope, or whether we are
				the last element.
			</P>
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
