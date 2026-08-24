import {
	moveCompletionSelection,
	startCompletion,
} from "@codemirror/autocomplete"
import { deleteLine } from "@codemirror/commands"
import { Prec } from "@codemirror/state"
import { keymap } from "@codemirror/view"

export const mauiEditorKeymap = Prec.highest(
	keymap.of([
		{ key: "Ctrl-n", run: moveCompletionSelection(true) },
		{ key: "Ctrl-p", run: moveCompletionSelection(false) },
		{ key: "Ctrl-Space", run: startCompletion },
		{ key: "Shift-Mod-k", run: deleteLine },
	]),
)
