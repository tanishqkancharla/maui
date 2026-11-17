import { lazy } from "react"

export const AiChatPage = lazy(async () => ({
	default: (await import("./AiChatPage")).AiChatPage,
}))

export const AssistantMessagePage = lazy(async () => ({
	default: (await import("./AssistantMessagePage")).AssistantMessagePage,
}))

export const DrawerPage = lazy(async () => ({
	default: (await import("./DrawerPage")).DrawerPage,
}))

export const EditorPage = lazy(async () => ({
	default: (await import("./EditorPage")).EditorPage,
}))

export const HaloPage = lazy(async () => ({
	default: (await import("./HaloPage")).HaloPage,
}))

export const IconsPage = lazy(async () => ({
	default: (await import("./IconsPage")).IconsPage,
}))

export const JsxEditorPage = lazy(async () => ({
	default: (await import("./JsxEditorPage")).JsxEditorPage,
}))
