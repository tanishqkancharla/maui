import { PurseProvider } from "purse-styles"
import { useMemo, type ReactNode } from "react"
import { Button } from "../../components/Button"
import { Kbd } from "../../components/Code"
import { Text } from "../../components/Text"
import { Icons } from "../../components/Icons"
import {
	ThemeContext,
	useTheme,
	type ThemeContextValue,
} from "../../theme/ThemeContext"
import { backgroundColor } from "../../tokens/background"
import { borderColor } from "../../tokens/borders"
import { colors } from "../../tokens/colors"
import { shadowVars } from "../../tokens/shadow"
import { spacing } from "../../tokens/spacing"
import { fontFamily, monoFontFamily } from "../../tokens/text"
import { UIDatabaseProvider } from "../../UIDatabase/UIDatabase"
import { mauiSyntaxColors } from "../../utils/mauiShikiTheme"
import type { DesignSystemApi } from "./DesignSystemApi"
import { catalog, defaultJsx, iconNames, previewScope } from "./catalog"

function IsolatedPreviewProviders(props: {
	theme: ThemeContextValue
	children: ReactNode
}) {
	return (
		<ThemeContext.Provider value={props.theme}>
			<PurseProvider>
				<UIDatabaseProvider>{props.children}</UIDatabaseProvider>
			</PurseProvider>
		</ThemeContext.Provider>
	)
}

/**
 * Maui adapter for the standalone JSX editor. Swap this for another
 * `DesignSystemApi` to host a different component catalog.
 */
export function useMauiDesignSystem(): DesignSystemApi {
	const theme = useTheme()
	const dark = theme.resolvedTheme === "dark"

	return useMemo(
		() => ({
			catalog,
			previewScope,
			iconNames,
			defaultSource: defaultJsx,
			storageKey: "maui-jsx-editor",
			resolvedTheme: theme.resolvedTheme,
			syntax: dark ? mauiSyntaxColors.dark : mauiSyntaxColors.light,
			chrome: {
				elementBackground: backgroundColor.element,
				outline: borderColor.outline,
				gray4: colors.gray[4],
				gray9: colors.gray[9],
				gray11: colors.gray[11],
				gray12: colors.gray[12],
				red3: colors.red[3],
				red6: colors.red[6],
				red9: colors.red[9],
				red11: colors.red[11],
				accent4: colors.accent[4],
				accentAlpha3: colors.accentAlpha[3],
				accentAlpha4: colors.accentAlpha[4],
				accentAlpha5: colors.accentAlpha[5],
				accent11: colors.accent[11],
				radiusLg: "8px",
				shadowMedium: shadowVars.medium,
				monoFontFamily,
				uiFontFamily: fontFamily,
				space3: spacing.value(3),
				space4: spacing.value(4),
				space8: spacing.value(8),
			},
			Chrome: {
				HeaderLabel: ({ children }) => (
					<Text size="xs" color="highContrast">
						{children}
					</Text>
				),
				FormatButton: ({ onClick }) => (
					<Button variant="quiet" onClick={onClick}>
						Format
						<Kbd>⌘S</Kbd>
					</Button>
				),
			},
			PreviewProviders: ({ children }) => (
				<IsolatedPreviewProviders theme={theme}>
					{children}
				</IsolatedPreviewProviders>
			),
		}),
		[dark, theme],
	)
}
