const overlaySelector = "vite-error-overlay"

let guardDepth = 0
let guardTimer = 0
let observer: MutationObserver | null = null

export function dismissDevOverlays() {
	if (typeof document === "undefined") return
	document.querySelectorAll(overlaySelector).forEach((node) => {
		const overlay = node as HTMLElement & { close?: () => void }
		if (typeof overlay.close === "function") {
			overlay.close()
			return
		}
		overlay.remove()
	})
}

function onGuardedEvent(event: Event) {
	if (guardDepth === 0) return
	event.preventDefault()
	event.stopImmediatePropagation()
	dismissDevOverlays()
}

function ensureGuard() {
	if (typeof window === "undefined") return
	if (observer) return

	window.addEventListener("error", onGuardedEvent, true)
	window.addEventListener("unhandledrejection", onGuardedEvent, true)
	observer = new MutationObserver(() => {
		if (guardDepth === 0) return
		dismissDevOverlays()
	})
	observer.observe(document.documentElement, { childList: true, subtree: true })
}

export function beginPreviewErrorGuard() {
	ensureGuard()
	guardDepth += 1
	window.clearTimeout(guardTimer)
}

export function endPreviewErrorGuardSoon() {
	window.clearTimeout(guardTimer)
	guardTimer = window.setTimeout(() => {
		guardDepth = 0
		dismissDevOverlays()
	}, 80)
}

export function toPreviewError(error: unknown): Error {
	return error instanceof Error ? error : new Error(String(error))
}
