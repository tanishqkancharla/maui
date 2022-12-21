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
