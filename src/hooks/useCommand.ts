import { useEffect } from "react"
import { useRefCurrent } from "./useRefCurrent"

type MaybeMeta = "Meta-" | ""
type MaybeShift = "Shift-" | ""
type MaybeAlt = "Alt-" | ""

type KeyboardKey =
	| "A"
	| "B"
	| "C"
	| "D"
	| "E"
	| "F"
	| "G"
	| "H"
	| "I"
	| "J"
	| "K"
	| "L"
	| "M"
	| "N"
	| "O"
	| "P"
	| "Q"
	| "R"
	| "S"
	| "T"
	| "U"
	| "V"
	| "W"
	| "X"
	| "Y"
	| "Z"
	| "ArrowUp"
	| "ArrowDown"
	| "ArrowLeft"
	| "ArrowRight"
	| "Enter"
	| "Tab"
	| "Backspace"

type CommandShortcut = `${MaybeMeta}${MaybeShift}${MaybeAlt}${KeyboardKey}`

type CommandProps = {
	shortcut: CommandShortcut
	execute: () => void
}

type ParsedShortcut = {
	metaKey: boolean
	shiftKey: boolean
	altKey: boolean
	key: string
}

function parseShortcut(shortcut: string): ParsedShortcut {
	const keys = shortcut.split("-")

	const key = keys.filter(
		(value) => value !== "Meta" && value !== "Shift" && value !== "Alt"
	)[0]

	return {
		metaKey: keys.includes("Meta"),
		shiftKey: keys.includes("Shift"),
		altKey: keys.includes("Alt"),
		key,
	}
}

export function useCommand(props: CommandProps) {
	const { shortcut, execute } = props

	const executeRef = useRefCurrent(execute)

	useEffect(() => {
		const parsedShortcut = parseShortcut(shortcut)

		function handleKeyboardEvent(event: KeyboardEvent) {
			const matchesShortcut =
				event.metaKey === parsedShortcut.metaKey &&
				event.shiftKey === parsedShortcut.shiftKey &&
				event.altKey === parsedShortcut.altKey &&
				event.key === parsedShortcut.key

			if (matchesShortcut) {
				executeRef.current?.()
				event.preventDefault()
				event.stopPropagation()
			}
		}

		window.addEventListener("keydown", handleKeyboardEvent)

		return () => window.removeEventListener("keydown", handleKeyboardEvent)
	}, [shortcut])
}
