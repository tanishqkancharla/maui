import { sandDark, violetDark } from "@radix-ui/colors"
import dedent from "dedent"
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	useSyncExternalStore,
} from "react"
import {
	InMemoryTupleStorage,
	KeyValuePair,
	ReadOnlyTupleDatabaseClientApi,
	transactionalReadWrite,
	TupleDatabase,
	TupleDatabaseClient,
	TupleDatabaseClientApi,
	TupleTransactionApi,
} from "tuple-database"
import {
	FilterTupleValuePairByPrefix,
	TuplePrefix,
	ValueForTuple,
} from "tuple-database/database/typeHelpers"
import { Button } from "../components/Button"
import { Checkbox } from "../components/Checkbox"
import { QuietTextField } from "../components/Input"
import { H3, P } from "../components/Typography"
import { Flex, Gap, Spacer } from "../components/Utils"
import { baseStyles } from "../utils/purseStyles"
import { style } from "../utils/styles"
import { useMemoShallowEqual } from "../utils/useMemoShallowEqual"
import { useRerender } from "../utils/useRerender"
import { useShortcut } from "../utils/useShortcut"

type AppSchema = CommandSchema | CliSchema | UISchema
type Db = TupleDatabaseClientApi<AppSchema>
type ReadOnlyDb = ReadOnlyTupleDatabaseClientApi<AppSchema>

const query = transactionalReadWrite<AppSchema>()
const command = <Args extends any[]>(fn: CommandQuery<Args>) => query(fn)

type CommandQuery<Args extends any[]> = (
	tx: TupleTransactionApi<AppSchema>,
	...args: Args
) => CommandResult

const DatabaseContext = createContext<{ db: Db } | undefined>(undefined)

function useDb() {
	const context = useContext(DatabaseContext)

	if (!context) {
		throw new Error(`Database was undefined`)
	}

	return context.db
}

export type Callback<T> = (value: T) => void

// Idk why the inference doesn't work properly without this overload
export function useDatabase<Key extends AppSchema["key"]>(
	db: TupleDatabaseClientApi<AppSchema>,
	key: Readonly<Key>
): ValueForTuple<AppSchema, Key> | undefined

export function useDatabase<
	Key extends Schema["key"],
	Schema extends KeyValuePair
>(
	db: TupleDatabaseClientApi<Schema>,
	key: Readonly<Key>
): ValueForTuple<Schema, Key> | undefined {
	const memoedKey = useMemoShallowEqual(key)

	const subscribe = useCallback(
		(callback: Callback<any>) => {
			return db.subscribe({ prefix: key as any }, callback)
		},
		[memoedKey]
	)

	const getValue = useCallback(() => db.get(key), [memoedKey])

	return useSyncExternalStore(subscribe, getValue)
}

export function useDatabaseScan<P extends TuplePrefix<AppSchema["key"]>>(
	db: TupleDatabaseClient<AppSchema>,
	prefix: P
): FilterTupleValuePairByPrefix<AppSchema, P>[]

export function useDatabaseScan<
	P extends TuplePrefix<Schema["key"]>,
	Schema extends KeyValuePair
>(
	db: TupleDatabaseClient<Schema>,
	prefix: P
): FilterTupleValuePairByPrefix<Schema, P>[] {
	const memoedPrefix = useMemoShallowEqual(prefix)

	const rerender = useRerender()
	const value = db.scan({ prefix })

	useEffect(() => {
		const unsubscribe = db.subscribe({ prefix: memoedPrefix }, rerender)

		return unsubscribe
	}, [memoedPrefix])

	return value
}

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
		const matchingCommand = tx
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

const dividerStyle = style({
	border: "none",
	borderTop: "1px solid rgb(62 62 58)",
	margin: 0,
	width: "100%",
})

function CliDivider() {
	return <hr className={dividerStyle} />
}

const commandLineStyles = style({
	padding: "6px 10px",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: "6px",
})

const promptStyles = style({
	color: violetDark.violet8,
	paddingRight: "4px",
	flex: "0 0 auto",
})

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
		<div className={commandLineStyles}>
			<span className={promptStyles}>{">"}</span>
			<QuietTextField
				aria-label="Command line interface input"
				onFocusChange={setFocused}
				placeholder="Type a command..."
				value={value}
				onChange={setValue}
			/>
		</div>
	)
}

const errorStyle = style({
	color: "hsl(358 75% 59%)",
	margin: "0",
	padding: "6px 10px",
})

function CliError(props: { children?: React.ReactNode }) {
	return <p className={errorStyle}>{props.children}</p>
}

const shadows = {
	medium: (hslShadowColor: string) =>
		style({
			boxShadow: dedent(`
        0px -0.5px 0.6px hsl(${hslShadowColor} / 0.36) inset,
        0px -1.6px 1.8px -0.8px hsl(${hslShadowColor} / 0.36) inset,
        0px -4px 4.5px -1.7px hsl(${hslShadowColor} / 0.36) inset,
        0px -9.7px 10.9px -2.5px hsl(${hslShadowColor} / 0.36) inset
      `),
		}),
}

const historyStyles = style(shadows.medium("0deg 0% 16%"), {
	height: "180px",
	display: "flex",
	flexDirection: "column-reverse",
	overflowY: "scroll",
})

const inputStyle = style(baseStyles.bodyText, {
	flex: "1 1 auto",
	backgroundColor: "transparent",
	color: "white",
	border: "none",
	outline: "none",
	margin: 0,
	padding: 0,
	"::placeholder": {
		color: sandDark.sand8,
	},
})

function CliHistory(props: { history: CliState["history"] }) {
	return (
		<div className={historyStyles}>
			{props.history.map((historyItem, index) => (
				<React.Fragment key={index}>
					{historyItem.type === "error" && (
						<>
							<CliError>{historyItem.error}</CliError>
							<CliDivider />
						</>
					)}
					<div className={commandLineStyles}>
						<span className={promptStyles}>{">  "}</span>
						<span className={inputStyle}>{historyItem.cmd}</span>
					</div>
					<CliDivider />
				</React.Fragment>
			))}
		</div>
	)
}

const cliStyle = style({
	border: "1px solid rgb(62 62 58)",
	display: "flex",
	flexDirection: "column",
	borderRadius: "4px",
	maxWidth: "240px",
})

function Cli() {
	const db = useDb()
	useMemo(() => cliQueries.init(db), [])
	const state = useDatabase(db, ["cli"])!

	const submitCliCommand = (cmd: string) => {
		cliQueries.submitCmd(db, cmd)
	}

	return (
		<div className={cliStyle}>
			<CliHistory history={state.history} />
			<div style={{ position: "relative", zIndex: 10 }}>
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
		console.log({ command })

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

function randomString() {
	return Math.random().toString().slice(3, 13)
}

function useCommand<Args extends any[]>(command: Command<Args>) {
	const db = useDb()
	const id = useMemo(() => randomString(), [])

	useEffect(() => {
		commandQueries.registerCommand(db, id, command)

		return () => commandQueries.unregisterCommand(db, id)
	}, [command.name, command.cliName])

	return useCallback((...args: Args) => {
		commandQueries.execute(db, id, ...args)
	}, [])
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

function Todo(props: { todo: Todo; index: number }) {
	const { todo, index } = props
	const db = useDb()

	const onTodoToggle = useCommand({
		name: `Toggle Todo ${index}`,
		cliName: `todo ${index} toggle`,
		execute: appCommands.toggleTodo,
	})

	const onLabelChange = (label: string) => {
		appCommands.updateTodoLabel(db, index, label)
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: "4px",
				width: "300px",
			}}
		>
			<Checkbox checked={todo.checked} setChecked={() => onTodoToggle(index)} />
			<QuietTextField
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
	const db = useDb()
	useMemo(() => appCommands.init(db), [])

	const onClick = useCommand({
		name: "New Todo",
		cliName: "todo new",
		execute: appCommands.newTodo,
	})

	const { todos } = useDatabase(db, ["ui"])!

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
	const context = useMemo(() => {
		const db: Db = new TupleDatabaseClient(
			new TupleDatabase(new InMemoryTupleStorage())
		)

		return { db }
	}, [])

	return (
		<DatabaseContext.Provider value={context}>
			<div>
				<H3>Command Line Experiment</H3>
				<P>
					This experiment is about trying to marry graphical and command line
					input. It seems graphical interfaces are easier for beginner users,
					but command lines are more efficient for "power" users. By mapping
					user interface commands into command line commands, a user can
					discover analogies between the interactions, making it easier for them
					to transition from a beginner to an expert quickly.
				</P>
				<P>
					Future work could include user "scripts", cli autocomplete, or cli
					undo/redo
				</P>
				<Flex row>
					<Cli />
					<Gap width={20} />
					<App />
				</Flex>
			</div>
		</DatabaseContext.Provider>
	)
}
