import { Button } from "../components/Button"
import { P } from "../components/Typography"
import { Flex, Padding } from "../components/Utils"
import { FocusScope } from "../hooks/useFocus"
import { useTupleDatabase } from "../hooks/useTupleDatabase"
import { FocusTreeKey } from "../UIDatabase/Focus"
import { useUIDatabase } from "../UIDatabase/UIDatabase"

function CurrentFocusView() {
	const db = useUIDatabase()
	const currentFocus = useTupleDatabase(db, ["activeFocus"]) as FocusTreeKey

	return <P>Current focus: [{currentFocus?.join(", ")}]</P>
}

export function ManagedFocusDemo() {
	return (
		<Padding xy={30}>
			<P>
				The demo here is a little lame, but it was more of a demonstration of a
				specific kind of architecture around managing focus.
			</P>
			<P>
				Each button, when mounted, registers itself as a focusable element into
				the context. The context provider sets up a store to track these
				elements and sets up global listeners for "tab" and "shift-tab" to cycle
				through.
			</P>
			<P>
				The next demo demonstrates how to extend this idea to incorporate common
				focus management patterns.
			</P>
			<Flex column gap={8}>
				<FocusScope>
					<Button>Button 1</Button>
					<Button>Button 2</Button>
					<Button>Button 3</Button>
					<Button>Button 4</Button>
				</FocusScope>
				<CurrentFocusView />
			</Flex>
		</Padding>
	)
}
