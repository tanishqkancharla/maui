import { css } from "goober"
import { useContext, useEffect, useMemo, useRef } from "react"
import { useTupleDatabase } from "tuple-database/useTupleDatabase"
import { P } from "../components/Typography"
import { Flex, Padding } from "../components/Utils"
import { randomId } from "../utils/randomId"

// =================================================
// DATABASE
// =================================================

import {
	InMemoryTupleStorage,
	ReadOnlyTupleDatabaseClientApi,
	transactionalReadWrite,
	TupleDatabase,
	TupleDatabaseClient,
	TupleDatabaseClientApi,
} from "tuple-database"

export type UIDatabaseSchema = UIFocusSchema

export const uiQuery = transactionalReadWrite<UIDatabaseSchema>()
export type UIDatabase = TupleDatabaseClientApi<UIDatabaseSchema>
export type ReadOnlyUIDatabase =
	ReadOnlyTupleDatabaseClientApi<UIDatabaseSchema>
const UIDatabaseContext = React.createContext<UIDatabase | undefined>(undefined)

export function UIDatabaseProvider(props: { children: React.ReactNode }) {
	const db = useMemo(() => {
		return new TupleDatabaseClient<UIDatabaseSchema>(
			new TupleDatabase(new InMemoryTupleStorage())
		)
	}, [])

	useEffect(() => {
		;(window as any).db = db
		db.subscribe({ prefix: [] }, (writes) => {
			console.log(writes)
		})
	}, [])

	return (
		<UIDatabaseContext.Provider value={db}>
			{props.children}
		</UIDatabaseContext.Provider>
	)
}

export function useUIDatabase() {
	const db = useContext(UIDatabaseContext)

	if (!db) {
		throw new Error("UI Database Context not found")
	}

	return db
}

// =================================================
// FOCUS
// =================================================

import React, { useCallback } from "react"
import { equals } from "remeda"

export type UIFocusSchema =
	| {
			key: ["focusable", ...string[]]
			value: null
	  }
	| {
			key: ["focus"]
			value: string[]
	  }

export const focusQueries = {
	registerFocusable: uiQuery((tx, key: string[]) => {
		if (tx.get(["focusable", ...key])) {
			console.warn(`Focusable element with key ${key} already exists`)
		}

		tx.set(["focusable", ...key], null)
	}),

	unregisterFocusable: uiQuery((tx, key) => {
		if (!tx.get(["focusable", ...key])) {
			console.warn(`Focusable element with key ${key} doesn't exist`)
		}

		tx.remove(["focusable", ...key])
	}),

	focus: uiQuery((tx, key: string[]) => {
		tx.set(["focus"], key)
	}),

	blur: uiQuery((tx, key: string[]) => {
		if (equals(tx.get(["focus"]), key)) tx.remove(["focus"])
	}),

	moveToNextFocus: undefined,
	moveToPreviousFocus: undefined,
}

function isElementFocused(db: ReadOnlyUIDatabase, key: string[]) {
	return db.get(["focus"]) === key
}

export function useFocus(
	key: string,
	ref: React.MutableRefObject<HTMLElement | null>
) {
	const parentScope = useContext(FocusScopeContext)
	const db = useUIDatabase()

	const scope = useMemo(() => [...parentScope, key], [parentScope, key])

	useEffect(() => {
		focusQueries.registerFocusable(db, scope)
		return () => focusQueries.unregisterFocusable(db, scope)
	}, [scope])

	const onFocus = useCallback(
		(event: React.FocusEvent) => {
			if (event.target !== event.currentTarget) return

			focusQueries.focus(db, scope)
		},
		[scope]
	)

	const onBlur = useCallback(
		(event: React.FocusEvent) => {
			if (event.target !== event.currentTarget) return

			focusQueries.blur(db, scope)
		},
		[scope]
	)

	const focused = useTupleDatabase(db, isElementFocused, [scope])

	useEffect(() => {
		if (focused) ref.current?.focus()
	}, [focused])

	const focusProps = {
		onFocus,
		onBlur,
	} satisfies React.HTMLAttributes<HTMLElement>

	return [focused, focusProps] as const
}

const FocusScopeContext = React.createContext<string[]>([])

export function FocusScope(props: {
	scope: string
	children: React.ReactNode
}) {
	const { scope, children } = props
	const parentScope = useContext(FocusScopeContext)

	const fullScope = useMemo(() => [...parentScope, scope], [parentScope, scope])

	return (
		<FocusScopeContext.Provider value={fullScope}>
			{children}
		</FocusScopeContext.Provider>
	)
}

const buttonClass = css`
	background: linear-gradient(var(--sand-3), var(--sand-2)),
		radial-gradient(var(--sand-3), var(--sand-2));

	color: white;
	padding: 6px 12px;
	border-radius: 4px;
	height: 28px;
	width: fit-content;

	font-weight: 400;
	font-size: 12px;
	letter-spacing: 0.01em;
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
	line-height: 16px;

	border: none;
	box-shadow: rgb(62 62 58) 0px 0px 0px 1px inset;

	-webkit-line-clamp: 1;
	line-clamp: 1;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	transition: box-shadow 80ms ease-in-out;

	&:focus-visible {
		box-shadow: var(--accent-color) 0px 0px 0px 1px inset;
		outline: none;
	}

	&:hover {
		background: linear-gradient(var(--sand-5), var(--sand-4)),
			radial-gradient(var(--sand-5), var(--sand-4));
	}

	&:active {
		background: linear-gradient(var(--sand-6), var(--sand-4)),
			radial-gradient(var(--sand-6), var(--sand-4));
	}
`

function Button(props: { children: string; onClick?: () => void }) {
	const ref = useRef<HTMLButtonElement>(null)
	const key = useMemo(() => `button-${randomId()}`, [])
	const [focused, focusProps] = useFocus(key, ref)

	return (
		<button
			className={buttonClass}
			ref={ref}
			onClick={props.onClick}
			{...focusProps}
		>
			{props.children}
		</button>
	)
}

function getCurrentFocus(db: ReadOnlyUIDatabase) {
	return db.get(["focus"])
}

function CurrentFocusView() {
	const db = useUIDatabase()
	const currentFocus = useTupleDatabase(db, getCurrentFocus, [])

	return <P>Current focus: [{currentFocus?.join(", ")}]</P>
}

export function ManagedFocusDemo() {
	return (
		<UIDatabaseProvider>
			<Padding xy={30}>
				<Flex column gap={8}>
					<FocusScope scope="buttons">
						<Button>Button 1</Button>
						<Button>Button 2</Button>
						<Button>Button 3</Button>
						<Button>Button 4</Button>
					</FocusScope>
					<CurrentFocusView />
				</Flex>
			</Padding>
		</UIDatabaseProvider>
	)
}
