import { isEqual } from "lodash"
import React, { useCallback, useContext, useEffect, useMemo } from "react"
import { useId } from "react-aria"
import {
	focusActions,
	FocusScopeProps,
	FocusTreeKey,
} from "../UIDatabase/Focus"
import { useUIDatabase } from "../UIDatabase/UIDatabase"
import { useTupleDatabase } from "./useTupleDatabase"

export function useFocus(id: string, ref: React.RefObject<HTMLElement | null>) {
	const parentScope = useContext(FocusScopeContext)
	const db = useUIDatabase()

	const elementKey = useMemo(
		() => [...parentScope, id] as FocusTreeKey,
		[parentScope, id]
	)

	useEffect(() => {
		focusActions.registerFocusElement(db, elementKey)
		return () => focusActions.unregisterFocusElement(db, elementKey)
	}, [elementKey])

	const onFocus = useCallback(
		(event: React.SyntheticEvent) => {
			if (event.target !== event.currentTarget) return

			focusActions.focus(db, elementKey)
		},
		[elementKey]
	)

	const activeFocus = useTupleDatabase(db, ["activeFocus"]) as string[]
	const focused = activeFocus && isEqual(activeFocus, elementKey)

	useEffect(() => {
		if (focused) ref.current?.focus()
	}, [focused])

	const focusProps = {
		onFocus,
	} satisfies React.HTMLAttributes<HTMLElement>

	return [focused, focusProps] as const
}

const FocusScopeContext = React.createContext<FocusTreeKey>(["focusTree"])

export function FocusScope(props: {
	children?: React.ReactNode
	/**
	 * Auto-focus the first element mounted in this scope.
	 * @default false
	 */
	autoFocus?: boolean
	/**
	 * Strategy to contain focus in scope
	 * @default "no-contain"
	 */
	containBehavior?: FocusScopeProps["containBehavior"]
}) {
	const { children, autoFocus = false, containBehavior = "no-contain" } = props
	const id = useId()

	const db = useUIDatabase()
	const parentScope = useContext(FocusScopeContext)
	const scope = useMemo(
		() => [...parentScope, id] as FocusTreeKey,
		[parentScope, id]
	)

	useEffect(() => {
		focusActions.registerFocusScope(db, scope, {
			autoFocus,
			containBehavior,
		})
		return () => focusActions.unregisterFocusScope(db, scope)
	}, [scope])

	return (
		<FocusScopeContext.Provider value={scope}>
			{children}
		</FocusScopeContext.Provider>
	)
}
