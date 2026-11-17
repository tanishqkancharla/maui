import { useState } from "react"
import { Button } from "../components/Button"
import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import {
	Dialog,
	DialogActions,
	DialogBody,
	DialogTitle,
} from "../components/Dialog"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { Panel } from "./Panel"

export function DialogPage() {
	const [standardOpen, setStandardOpen] = useState(false)
	const [alertOpen, setAlertOpen] = useState(false)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Dialog</H2>
			<P>
				A focused modal surface over a neutral scrim. Dialog handles focus,
				Escape, outside-click dismissal, scroll locking, and focus restoration.
				Compose its content with <Code>DialogTitle</Code>,{" "}
				<Code>DialogBody</Code>, and <Code>DialogActions</Code>. The default
				440px size suits confirmations; <Code>size=&quot;md&quot;</Code> gives forms
				up to 640px.
			</P>

			<H3>Standard</H3>
			<P>
				Standard dialogs dismiss from the scrim, Escape, or a close action.
				Secondary actions come before the primary action.
			</P>
			<Panel>
				<Button onPress={() => setStandardOpen(true)}>Open dialog</Button>
			</Panel>
			<Dialog isOpen={standardOpen} onOpenChange={setStandardOpen}>
				<DialogTitle>Save changes?</DialogTitle>
				<DialogBody>
					<P>
						Your updates are ready to save. You can cancel and continue editing.
					</P>
				</DialogBody>
				<DialogActions>
					<Button slot="close">Cancel</Button>
					<Button variant="primary" onPress={() => setStandardOpen(false)}>
						Save
					</Button>
				</DialogActions>
			</Dialog>

			<H3>Required decision</H3>
			<P>
				Use <Code>role=&quot;alertdialog&quot;</Code> only for urgent decisions.
				Disable pointer and keyboard dismissal so the user must choose an
				action.
			</P>
			<Panel>
				<Flex row alignItems="center" gap={4}>
					<Button onPress={() => setAlertOpen(true)}>Delete project</Button>
				</Flex>
			</Panel>
			<Dialog
				isOpen={alertOpen}
				onOpenChange={setAlertOpen}
				isDismissable={false}
				isKeyboardDismissDisabled
				role="alertdialog"
			>
				<DialogTitle>Delete this project?</DialogTitle>
				<DialogBody>
					<P>This action cannot be undone.</P>
				</DialogBody>
				<DialogActions>
					<Button slot="close">Cancel</Button>
					<Button
						variant="primary"
						variantColor="red"
						onPress={() => setAlertOpen(false)}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

			<H3>Usage</H3>
			<CodeBlock lang="tsx">{`const [open, setOpen] = useState(false)

<Button onPress={() => setOpen(true)}>Open dialog</Button>

<Dialog isOpen={open} onOpenChange={setOpen}>
  <DialogTitle>Save changes?</DialogTitle>
  <DialogBody>
    <P>Your updates are ready to save.</P>
  </DialogBody>
  <DialogActions>
    <Button slot="close">Cancel</Button>
    <Button variant="primary" onPress={() => setOpen(false)}>
      Save
    </Button>
  </DialogActions>
</Dialog>`}</CodeBlock>
		</Prose>
	)
}
