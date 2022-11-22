import { css } from "goober"
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react"
import { useHover } from "react-aria"
import { randomString } from "remeda"
import {
	InMemoryTupleStorage,
	ReadOnlyTupleDatabaseClientApi,
	transactionalReadWrite,
	TupleDatabase,
	TupleDatabaseClient,
	TupleTransactionApi,
} from "tuple-database"
import { useTupleDatabase } from "tuple-database/useTupleDatabase"
import { Button } from "./components/Button"
import { Checkbox } from "./components/Checkbox"
import { QuietInput } from "./components/Input"
import { Flex, Gap, Spacer } from "./components/Utils"
import { bodyFontStyles } from "./styles"
import { useShortcut } from "./useShortcut"

type AppSchema = CommandSchema | CliSchema | UISchema
type ReadOnlyDb = ReadOnlyTupleDatabaseClientApi<AppSchema>

const query = transactionalReadWrite<AppSchema>()
const command = <Args extends any[]>(fn: CommandQuery<Args>) => query(fn)

type CommandQuery<Args extends any[]> = (
	tx: TupleTransactionApi<AppSchema>,
	...args: Args
) => CommandResult

const db = new TupleDatabaseClient<AppSchema>(
	new TupleDatabase(new InMemoryTupleStorage())
)

const DatabaseContext = createContext({ db })

// ============================================================================
// CLI
// ============================================================================

type CliItem =
	| {
			cmd: string
			type: "success"
			value?: string | undefined
	  }
	| {
			cmd: string
			type: "error"
			error: string
	  }

type CliState = {
	history: CliItem[]
}

type CliSchema = {
	key: ["cli"]
	value: CliState
}

const cliQueries = {
	init: query((tx) => {
		tx.set(["cli"], { history: [] })
	}),
	submitCmd: query((tx, cmd: string) => {
		const lowercaseCmd = cmd.toLocaleLowerCase()
		const matchingCommand = db
			.scan({ prefix: ["command"] })
			.filter(({ value }) => {
				return value.cliName?.toLocaleLowerCase() === lowercaseCmd
			})[0]

		if (matchingCommand) {
			const id = matchingCommand.key[1]
			commandQueries.execute(tx, id)
		} else {
			cliQueries.pushErrorItem(tx, cmd)
		}
	}),
	pushErrorItem: query((tx, cmd: string) => {
		const { history } = tx.get(["cli"])!
		const result: CliItem = {
			cmd,
			type: "error",
			error: `Unknown command: ${cmd}`,
		}
		tx.set(["cli"], { history: [result, ...history] })
	}),
	pushItem: query((tx, item: CliItem) => {
		const { history } = tx.get(["cli"])!
		tx.set(["cli"], { history: [item, ...history] })
	}),
}

const cliDividerClass = css`
	border: none;
	border-top: 1px solid rgb(62 62 58);
	margin: 0;
	width: 100%;
`

function CliDivider() {
	return <hr className={cliDividerClass} />
}

const cliCommandLineClass = css`
	padding: 6px 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 6px;
	${bodyFontStyles}
`

const cliPromptClass = css`
	color: var(--accent-color);
	flex: 0 0 auto;
`

const cliInputClass = css`
	flex: 1 1 auto;
	background-color: transparent;
	color: white;
	font-weight: 400;
	font-size: 12px;
	border: none;
	outline: none;
	letter-spacing: 0.01em;
	line-height: 16px;
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
	margin: 0;
	padding: 0;

	&::placeholder {
		color: var(--sand-8);
	}
`

function CliInput(props: { onSubmit: (command: string) => void }) {
	const [value, setValue] = useState("")
	const [focused, setFocused] = useState(false)

	const onSubmit = () => {
		if (!focused) return
		props.onSubmit(value)
		setValue("")
	}

	useShortcut("enter", onSubmit)

	return (
		<div className={cliCommandLineClass}>
			<span className={cliPromptClass}>{">"}</span>
			<QuietInput
				aria-label="Command line interface input"
				onFocusChange={setFocused}
				placeholder="Type a command..."
				value={value}
				onChange={setValue}
			/>
		</div>
	)
}

const cliHistoryClass = css`
	height: 180px;
	display: flex;
	flex-direction: column-reverse;
	overflow-y: scroll;

	--shadow-color: 0deg 0% 16%;
	box-shadow: 0px -0.5px 0.6px hsl(var(--shadow-color) / 0.36) inset,
		0px -1.6px 1.8px -0.8px hsl(var(--shadow-color) / 0.36) inset,
		0px -4px 4.5px -1.7px hsl(var(--shadow-color) / 0.36) inset,
		0px -9.7px 10.9px -2.5px hsl(var(--shadow-color) / 0.36) inset;
`

const cliErrorClass = css`
	${bodyFontStyles}
	color: hsl(358 75% 59%);
	margin: 0;
	padding: 6px 10px;
`

function CliError(props: { children?: React.ReactNode }) {
	return <p className={cliErrorClass}>{props.children}</p>
}

function CliHistory(props: { history: CliState["history"] }) {
	return (
		<div className={cliHistoryClass}>
			{props.history.map((historyItem, index) => (
				<React.Fragment key={index}>
					{historyItem.type === "error" && (
						<>
							<CliError>{historyItem.error}</CliError>
							<CliDivider />
						</>
					)}
					<div className={cliCommandLineClass}>
						<span className={cliPromptClass}>{">"}</span>
						<span className={cliInputClass}>{historyItem.cmd}</span>
					</div>
					<CliDivider />
				</React.Fragment>
			))}
		</div>
	)
}

const cliClass = css`
	box-shadow: rgb(0 0 0 / 50%) 0px 0px 0px 0px inset,
		rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset,
		rgb(62 62 58) 0px 0px 0px 1px inset;
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	max-width: 240px;
`

const cliInputLineClass = css`
	position: relative;
	z-index: 10;
`

function getCliState(db: ReadOnlyDb) {
	return db.get(["cli"])
}

function Cli() {
	const { db } = useContext(DatabaseContext)
	useMemo(() => cliQueries.init(db), [])
	const state = useTupleDatabase(db, getCliState, [])!

	const submitCliCommand = (cmd: string) => {
		cliQueries.submitCmd(db, cmd)
	}

	return (
		<div className={cliClass}>
			<CliHistory history={state.history} />
			<div className={cliInputLineClass}>
				<CliDivider />
				<CliInput onSubmit={submitCliCommand} />
			</div>
		</div>
	)
}

// ============================================================================
// Command
// ============================================================================

type CommandResult =
	| {
			type: "success"
			value?: string
	  }
	| {
			type: "error"
			error: string
	  }

type Command<Args extends any[] = any> = {
	name: string
	cliName?: string
	execute: CommandQuery<Args>
}

type CommandSchema = {
	key: ["command", string]
	value: Command<any[]>
}

const commandQueries = {
	execute: query((tx, id: string, ...args: any[]) => {
		const command = tx.get(["command", id])
		if (!command) return
		const result = command.execute(tx, ...args)
		console.log(`${command.name}`)

		if (command.cliName !== undefined) {
			const cliItem: CliItem = {
				...result,
				cmd: command.cliName,
			}

			cliQueries.pushItem(tx, cliItem)
		}
	}),
	registerCommand: query((tx, id: string, command: Command<any>) => {
		tx.set(["command", id], command)
	}),
	unregisterCommand: query((tx, id: string) => {
		tx.remove(["command", id])
	}),
}

function useCommand<Args extends any[]>(command: Command<[]>) {
	const { db } = useContext(DatabaseContext)
	const id = useMemo(() => randomString(10), [])

	useEffect(() => {
		commandQueries.registerCommand(db, id, command)

		return () => commandQueries.unregisterCommand(db, id)
	}, [command.name, command.cliName])

	return (...args: Args) => {
		commandQueries.execute(db, id, ...args)
	}
}

type Todo = {
	checked: boolean
	label: string
}

type UIState = {
	todos: Todo[]
}

type UISchema = {
	key: ["ui"]
	value: UIState
}

const appCommands = {
	init: query((tx) => {
		tx.set(["ui"], { todos: [] })
	}),
	newTodo: command((tx): CommandResult => {
		const { todos } = tx.get(["ui"])!
		const todo: Todo = { checked: false, label: "" }

		tx.set(["ui"], { todos: [...todos, todo] })

		return {
			type: "success",
		}
	}),
	toggleTodo: command((tx, index: number): CommandResult => {
		const { todos } = tx.get(["ui"])!
		const todo = todos[index]
		if (!todo) {
			return {
				type: "error",
				error: `Could not find todo at index ${index}`,
			}
		}
		const newTodo: Todo = { ...todo, checked: !todo.checked }
		const newTodos = [...todos]
		newTodos.splice(index, 1, newTodo)
		tx.set(["ui"], { todos: newTodos })

		return {
			type: "success",
		}
	}),
	updateTodoLabel: command((tx, index: number, label: string) => {
		const { todos } = tx.get(["ui"])!
		const todo = todos[index]
		if (!todo) {
			return {
				type: "error",
				error: `Could not find todo at index ${index}`,
			}
		}
		const newTodo: Todo = { ...todo, label }
		const newTodos = [...todos]
		newTodos.splice(index, 1, newTodo)
		tx.set(["ui"], { todos: newTodos })

		return {
			type: "success",
		}
	}),
}

function getUIState(db: ReadOnlyDb) {
	return db.get(["ui"])
}

function Todo(props: { todo: Todo; index: number }) {
	const { todo, index } = props
	const { hoverProps, isHovered } = useHover({})

	const { db } = useContext(DatabaseContext)

	const onTodoToggle = useCommand({
		name: `Toggle Todo ${index}`,
		cliName: `todo ${index} toggle`,
		execute: command((tx) => appCommands.toggleTodo(tx, index)),
	})

	const onLabelChange = (label: string) => {
		appCommands.updateTodoLabel(db, index, label)
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				gap: 4,
				alignItems: "center",
				width: 300,
			}}
			{...hoverProps}
		>
			<Checkbox checked={todo.checked} setChecked={() => onTodoToggle(index)} />
			<QuietInput
				aria-label="Todo"
				placeholder="Write a todo..."
				value={todo.label}
				onChange={onLabelChange}
			/>
			<Spacer />
		</div>
	)
}

function App() {
	const { db } = useContext(DatabaseContext)
	useMemo(() => appCommands.init(db), [])

	const onClick = useCommand({
		name: "New Todo",
		cliName: "todo new",
		execute: appCommands.newTodo,
	})

	const { todos } = useTupleDatabase(db, getUIState, [])!

	return (
		<Flex column gap={12}>
			{todos.map((todo, index) => {
				return <Todo todo={todo} index={index} key={index} />
			})}
			<Button onClick={() => onClick()}>New Todo</Button>
		</Flex>
	)
}

export function CliExperiment() {
	return (
		<Flex row>
			<Cli />
			<Gap width={20} />
			<App />
		</Flex>
	)
}
