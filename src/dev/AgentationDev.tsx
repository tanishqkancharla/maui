import { Agentation } from "agentation"

const AGENTATION_ENDPOINT = "http://localhost:4747"

/**
 * Dev-only annotation toolbar. Vite replaces `import.meta.env.DEV` at build
 * time so this (and the `agentation` package) stay out of production.
 */
export function AgentationDev() {
	return <Agentation endpoint={AGENTATION_ENDPOINT} />
}
