import { style } from "purse-styles"

export const shadowTokens = {
	thin: style({ boxShadow: "var(--shadow-thin)" }),
	minimal: style({ boxShadow: "var(--shadow-minimal)" }),
	minimalFlat: style({ boxShadow: "var(--shadow-minimal-flat)" }),
	middle: style({ boxShadow: "var(--shadow-middle)" }),
	strong: style({ boxShadow: "var(--shadow-strong)" }),
	modalSmall: style({ boxShadow: "var(--shadow-modal-small)" }),
	panelFocused: style({ boxShadow: "var(--shadow-panel-focused)" }),
	bottomBorder: style({ boxShadow: "inset 0 -1.5px 0 var(--sand-6)" }),
	bottomBorderThin: style({ boxShadow: "inset 0 -1px 0 var(--sand-6)" }),
} as const
