import { style } from "@vanilla-extract/css"

export const baseStyles = {
	bodyText: style({
		fontWeight: 400,
		fontSize: 12,
		fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;`,
		letterSpacing: "0.01em",
		lineHeight: 1,
	}),
}

export const bodyFontStyles = `
	font-weight: 400;
	font-size: 12px;
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
	letter-spacing: 0.01em;
	line-height: 16px;
`

export const breakpointSizes = {
	mobile: 640,
	tablet: 768,
	desktop: 1024,
}

export const breakpoints = {
	mobile: "@media only screen and (min-width: 640px)",
	tablet: "@media only screen and (min-width: 768px)",
	desktop: "@media only screen and (min-width: 1024px)",
}
