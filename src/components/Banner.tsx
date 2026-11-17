import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "./Button"
import { Text } from "./Text"
import { CheckCircle } from "../icons/CheckCircle"
import { Close } from "../icons/Close"
import { CircleX } from "../icons/CircleX"
import { Information } from "../icons/Information"
import { WarningTriangle } from "../icons/WarningTriangle"
import { colors } from "../tokens/colors"
import { radius } from "../tokens/radius"
import { controlSize } from "../tokens/sizing"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { cls } from "../utils/cls"
import { memoize } from "../utils/memoize"

export type BannerTone = "neutral" | "info" | "success" | "warning" | "danger"
export type BannerLayout = "inline" | "stacked"

export type BannerProps = Omit<ComponentPropsWithoutRef<"div">, "title"> & {
	tone?: BannerTone
	/** Use stacked for multi-sentence messages or a title with supporting text. */
	layout?: BannerLayout
	title?: ReactNode
	/** A decorative icon. Defaults to the tone's icon; false hides it. */
	icon?: ReactNode | false
	actions?: ReactNode
	/** Adds a close button. The caller owns visibility. */
	onDismiss?: () => void
	dismissLabel?: string
}

const palettes = {
	neutral: "gray",
	info: "blue",
	success: "green",
	warning: "amber",
	danger: "red",
} as const

const icons = {
	neutral: Information,
	info: Information,
	success: CheckCircle,
	warning: WarningTriangle,
	danger: CircleX,
} as const

const root = memoize(({ tone = "neutral" }: { tone?: BannerTone } = {}) =>
	style(text({ size: "sm" }), radius.lg, spacing.padding({ all: 3 }), {
		display: "flex",
		alignItems: "flex-start",
		gap: spacing.value(3),
		minWidth: 0,
		backgroundColor: colors[palettes[tone]][2],
		border: `1px solid ${colors[palettes[tone]][6]}`,
		// Give text and icons the same inset beside standard-height controls.
		"--banner-text-inset": `max(0px, calc((${controlSize.height} - 1lh) / 2))`,
		"--banner-icon-color": colors[palettes[tone]][11],
	}),
)

const icon = style({
	flex: "0 0 auto",
	width: "1lh",
	height: "1lh",
	marginBlockStart: "var(--banner-text-inset)",
	color: "var(--banner-icon-color)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	"& > svg": { width: "100%", height: "100%" },
})

const body = memoize(({ layout = "inline" }: { layout?: BannerLayout } = {}) =>
	style({
		display: "flex",
		flex: "1 1 auto",
		minWidth: 0,
		flexDirection: layout === "stacked" ? "column" : "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		gap: spacing.value(4),
		"& > :first-child": {
			flex: layout === "inline" ? "1 1 12rem" : "0 1 auto",
		},
	}),
)

const content = style({
	minWidth: 0,
	maxWidth: "100%",
	paddingBlock: "var(--banner-text-inset)",
	overflowWrap: "anywhere",
})

const title = style({ display: "block" })
const description = style({ display: "block" })
const actions = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	flexWrap: "wrap",
	gap: spacing.value(4),
	maxWidth: "100%",
	marginInlineStart: "auto",
})
const dismiss = style({ flexShrink: 0 })

/** Plain div parts; icon is decorative. Layout changes action placement, not semantics. */
export const bannerStyles = {
	root,
	icon,
	body,
	content,
	title,
	description,
	actions,
	dismiss,
} as const

/** Persistent in-flow message. Set role="status" or role="alert" explicitly to announce it. */
export function Banner({
	tone = "neutral",
	layout = "inline",
	title,
	children,
	icon,
	actions,
	onDismiss,
	dismissLabel = "Dismiss notification",
	className,
	...props
}: BannerProps) {
	const rootClassName = useStyles(bannerStyles.root({ tone }))
	const iconClassName = useStyles(bannerStyles.icon)
	const bodyClassName = useStyles(bannerStyles.body({ layout }))
	const contentClassName = useStyles(bannerStyles.content)
	const titleClassName = useStyles(bannerStyles.title)
	const descriptionClassName = useStyles(
		bannerStyles.description,
		title != null && style({ color: colors.gray[11] }),
	)
	const actionsClassName = useStyles(bannerStyles.actions)
	const dismissClassName = useStyles(bannerStyles.dismiss)
	const Icon = icons[tone]

	return (
		<div {...props} className={cls(rootClassName, className)}>
			{icon !== false && (
				<div className={iconClassName} aria-hidden="true">
					{icon ?? <Icon />}
				</div>
			)}
			<div className={bodyClassName}>
				<div className={contentClassName}>
					{title != null && (
						<Text size="sm" fontWeight={500} className={titleClassName}>
							{title}
						</Text>
					)}
					{children != null && (
						<div className={descriptionClassName}>{children}</div>
					)}
				</div>
				{actions != null && actions !== false && (
					<div className={actionsClassName}>{actions}</div>
				)}
			</div>
			{onDismiss && (
				<Button
					variant="quiet"
					variantColor={palettes[tone]}
					aria-label={dismissLabel}
					onPress={onDismiss}
					className={dismissClassName}
				>
					<Close size="sm" />
				</Button>
			)}
		</div>
	)
}
