import { isEqual } from "lodash"
import { ReadOnlyUIDatabase, uiQuery } from "./UIDatabase"

export type FocusScopeProps = {
	containBehavior: "lock" | "cycle" | "no-contain"
	// restoreFocus: false | string[]
	autoFocus: boolean
}

type FocusScope = {
	type: "scope"
	id: string
} & FocusScopeProps

type FocusElement = {
	type: "element"
	id: string
}

export type FocusTreeKey = ["focusTree", ...string[]]

export type UIFocusSchema =
	| {
			key: FocusTreeKey
			value: FocusElement | FocusScope
	  }
	| {
			key: ["activeFocus"]
			value: FocusTreeKey | undefined
	  }

export const focusActions = {
	registerFocusElement: uiQuery((tx, elementKey: FocusTreeKey) => {
		if (tx.get(elementKey)) {
			throw new Error(`Focusable element with key ${elementKey} already exists`)
		}

		const focusElement: FocusElement = {
			type: "element",
			id: elementKey.last!,
		}

		tx.set(elementKey, focusElement)
	}),

	unregisterFocusElement: uiQuery((tx, elementKey: FocusTreeKey) => {
		if (!tx.get(elementKey)) {
			throw new Error(`Focusable element with key ${elementKey} doesn't exist`)
		}

		tx.remove(elementKey)
	}),

	registerFocusScope: uiQuery(
		(tx, scopeKey: FocusTreeKey, scopeProps: FocusScopeProps) => {
			if (tx.get(scopeKey)) {
				throw new Error(`Focus scope with key ${scopeKey} already exists`)
			}

			const scope: FocusScope = {
				type: "scope",
				id: scopeKey.last!,
				...scopeProps,
			}

			tx.set(scopeKey, scope)

			if (scopeProps.autoFocus) {
				const firstChild = focusQueries.getFirstElementInScope(tx, scopeKey)

				if (firstChild) {
					focusActions.focus(tx, firstChild.key)
				}
			}
		}
	),

	unregisterFocusScope: uiQuery((tx, scopeKey: FocusTreeKey) => {
		if (!tx.get(scopeKey)) {
			throw new Error(`Focus scope with key ${scopeKey} doesn't exist`)
		}

		// TODO: respect restoreFocus
		tx.remove(scopeKey)
	}),

	focus: uiQuery((tx, key: FocusTreeKey) => {
		tx.set(["activeFocus"], key)
	}),

	blur: uiQuery((tx, key: FocusTreeKey) => {
		if (isEqual(tx.get(["activeFocus"]), key)) {
			tx.set(["activeFocus"], undefined)
		}
	}),

	moveToNextFocus: uiQuery((tx) => {
		const activeFocus = tx.get(["activeFocus"])
		if (!activeFocus) {
			const firstFocusableElement = focusQueries.getFirstElementInScope(tx, [
				"focusTree",
			])
			if (firstFocusableElement)
				tx.set(["activeFocus"], firstFocusableElement.key)
			return
		}

		const isLast = focusQueries.isElementLastInScope(tx, activeFocus)

		if (!isLast) {
			const nextElement = focusQueries.getNextFocusElement(tx, activeFocus)
			if (nextElement) tx.set(["activeFocus"], nextElement.key)
			return
		}

		const { key: scopeKey, value: scope } = focusQueries.getParentScope(
			tx,
			activeFocus
		)

		if (scope.containBehavior === "no-contain") {
			const nextElement = focusQueries.getNextFocusElement(tx, activeFocus)
			if (nextElement) tx.set(["activeFocus"], nextElement.key)
		} else if (scope.containBehavior === "cycle") {
			const firstElement = focusQueries.getFirstElementInScope(tx, scopeKey)
			if (firstElement) tx.set(["activeFocus"], firstElement.key)
		} else if (scope.containBehavior === "lock") {
			// Don't change active focus
			return
		}
	}),

	moveToPreviousFocus: uiQuery((tx) => {
		const activeFocus = tx.get(["activeFocus"])
		if (!activeFocus) {
			const firstFocusableElement = focusQueries.getLastElementInScope(tx, [
				"focusTree",
			])
			if (firstFocusableElement)
				tx.set(["activeFocus"], firstFocusableElement.key)
			return
		}

		const isFirst = focusQueries.isElementFirstInScope(tx, activeFocus)

		if (!isFirst) {
			const previousElement = focusQueries.getPreviousFocusElement(
				tx,
				activeFocus
			)
			if (previousElement) tx.set(["activeFocus"], previousElement.key)
			return
		}

		const { key: scopeKey, value: scope } = focusQueries.getParentScope(
			tx,
			activeFocus
		)

		if (scope.containBehavior === "no-contain") {
			const previousElement = focusQueries.getPreviousFocusElement(
				tx,
				activeFocus
			)
			if (previousElement) tx.set(["activeFocus"], previousElement.key)
		} else if (scope.containBehavior === "cycle") {
			const lastElement = focusQueries.getLastElementInScope(tx, scopeKey)
			if (lastElement) tx.set(["activeFocus"], lastElement.key)
		} else if (scope.containBehavior === "lock") {
			// Don't change active focus
			return
		}
	}),
}

type FocusElementAndKey = {
	key: ["focusTree", ...string[]]
	value: FocusElement
}

type FocusScopeAndKey = {
	key: ["focusTree", ...string[]]
	value: FocusScope
}

export const focusQueries = {
	getPreviousFocusElement(db: ReadOnlyUIDatabase, elementKey: FocusTreeKey) {
		const previousElements = db.scan<FocusTreeKey, FocusTreeKey>({
			lt: elementKey,
			reverse: true,
		})

		const previous = previousElements.find(
			({ value }) => value.type === "element"
		)

		return previous as FocusElementAndKey | undefined
	},
	getNextFocusElement(db: ReadOnlyUIDatabase, elementKey: FocusTreeKey) {
		const nextElements = db.scan<FocusTreeKey, FocusTreeKey>({ gt: elementKey })

		const nextElement = nextElements.find(
			({ value }) => value.type === "element"
		)

		return nextElement as FocusElementAndKey | undefined
	},
	getFirstElementInScope(db: ReadOnlyUIDatabase, scopeKey: FocusTreeKey) {
		return focusQueries.getAllElementsInScope(db, scopeKey).first
	},
	getLastElementInScope(db: ReadOnlyUIDatabase, scopeKey: FocusTreeKey) {
		return focusQueries.getAllElementsInScope(db, scopeKey).last
	},
	// TODO: Could have a different index just for elements that would make
	// this more efficient
	getAllElementsInScope(db: ReadOnlyUIDatabase, scopeKey: FocusTreeKey) {
		const elements = db
			.scan({ prefix: scopeKey })
			.filter(({ value }) => value.type === "element")

		return elements as FocusElementAndKey[]
	},
	isElementFirstInScope(db: ReadOnlyUIDatabase, elementKey: FocusTreeKey) {
		const parentScopeKey = elementKey.slice(0, -1) as FocusTreeKey
		const elementsInScope = focusQueries.getAllElementsInScope(
			db,
			parentScopeKey
		)
		const firstElementInScopeKey = elementsInScope[0].key

		return isEqual(firstElementInScopeKey, elementKey)
	},
	isElementLastInScope(db: ReadOnlyUIDatabase, elementKey: FocusTreeKey) {
		const parentScopeKey = elementKey.slice(0, -1) as FocusTreeKey
		const elementsInScope = focusQueries.getAllElementsInScope(
			db,
			parentScopeKey
		)
		const lastElementInScopeKey =
			elementsInScope[elementsInScope.length - 1].key

		return isEqual(lastElementInScopeKey, elementKey)
	},
	getParentScope(
		db: ReadOnlyUIDatabase,
		elementKey: FocusTreeKey
	): FocusScopeAndKey {
		const parentScopeKey = elementKey.slice(0, -1) as FocusTreeKey

		const parentScope = db.get(parentScopeKey)
		if (parentScope?.type !== "scope") {
			throw new Error(`Expected parent scope here`)
		}

		return { key: parentScopeKey, value: parentScope }
	},
	isElementFocused(db: ReadOnlyUIDatabase, elementKey: FocusTreeKey) {
		return isEqual(focusQueries.getActiveFocus(db), elementKey)
	},
	getActiveFocus(db: ReadOnlyUIDatabase) {
		return db.get(["activeFocus"])
	},
}
