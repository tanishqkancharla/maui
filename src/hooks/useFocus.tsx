import React, { useCallback, useContext, useEffect, useMemo } from "react"
import { equals } from "remeda"
import { useTupleDatabase } from "tuple-database/useTupleDatabase"
import { ReadOnlyUIDatabase, uiQuery, useUIDatabase } from "./UIDatabase"

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
