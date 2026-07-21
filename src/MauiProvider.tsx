import type { ReactNode } from "react"
import { PurseProvider, useInjectGlobalStyles } from "purse-styles"
import { ThemeProvider } from "./theme/ThemeContext"
import { UIDatabaseProvider } from "./UIDatabase/UIDatabase"
import { backgroundColor } from "./tokens/background"
import { baseTextStyle } from "./tokens/text"

function MauiGlobalStyles() {
	useInjectGlobalStyles(
		"*, *::after, *::before",
		{
			boxSizing: "border-box",
		},
		[],
	)
	useInjectGlobalStyles(
		"html, body",
		{
			margin: 0,
			backgroundColor: backgroundColor.app,
			...baseTextStyle,
		},
		[],
	)
	useInjectGlobalStyles(
		'button, [role="button"]',
		{
			cursor: "default",
		},
		[],
	)

	return null
}

/**
 * Root provider for consuming Maui. Wraps theme (`data-theme`), purse-styles,
 * design-system globals, and the focus UI database used by Button/Dialog.
 *
 * Pair with {@link themeFoucScript} in `<head>` to avoid a flash of wrong theme.
 */
export function MauiProvider(props: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<PurseProvider>
				<MauiGlobalStyles />
				<UIDatabaseProvider>{props.children}</UIDatabaseProvider>
			</PurseProvider>
		</ThemeProvider>
	)
}
