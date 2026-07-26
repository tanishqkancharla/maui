import React from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Icons } from "../components/Icons"
import { Prose } from "../components/Prose"
import { Tooltip } from "../components/Tooltip"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { flex } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { shadow } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

import { colors } from "../tokens/colors"
export function TooltipPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Tooltip</H2>
			<P>
				Tooltips show after a short warmup delay on hover, or immediately on
				keyboard focus. Press Escape to dismiss.
			</P>
			<Flex row alignItems="center" gap={4}>
				<Tooltip content="Shown above the trigger" placement="top">
					<Button>Top</Button>
				</Tooltip>
				<Tooltip content="Shown below the trigger" placement="bottom">
					<Button>Bottom</Button>
				</Tooltip>
				<Tooltip content="Shown to the left" placement="left">
					<Button>Left</Button>
				</Tooltip>
				<Tooltip content="Shown to the right" placement="right">
					<Button>Right</Button>
				</Tooltip>
				<Tooltip content="No warmup delay" delay={0}>
					<Button>Instant</Button>
				</Tooltip>
				<Tooltip
					content="Tooltips can hold longer descriptions, and they wrap once they hit the max width."
					placement="bottom"
				>
					<Button>Long content</Button>
				</Tooltip>
			</Flex>

			<H3>Toolbar of actions</H3>
			<P>
				Icon-only actions rely on tooltips to explain themselves. Once one
				tooltip is open, moving across the bar shows the rest immediately. Tab
				through the toolbar to see tooltips appear instantly on keyboard focus.
			</P>
			<Toolbar />
		</Prose>
	)
}

type ToolbarAction = {
	label: string
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const messageActions: ToolbarAction[] = [
	{ label: "Star thread", icon: Icons.Star },
	{ label: "Archive thread", icon: Icons.Archive },
	{ label: "Delete thread", icon: Icons.Trash },
	{ label: "Mark unread", icon: Icons.Envelope },
	{ label: "Snooze thread", icon: Icons.Clock },
]

const utilityActions: ToolbarAction[] = [
	{ label: "Pin thread", icon: Icons.Pin },
	{ label: "Search in thread", icon: Icons.Search },
	{ label: "More actions", icon: Icons.DotsHorizontal },
]

function Toolbar() {
	const toolbarClassName = useStyles(toolbarClass)
	const dividerClassName = useStyles(toolbarDividerClass)

	return (
		<div role="toolbar" aria-label="Thread actions" className={toolbarClassName}>
			{messageActions.map((action) => (
				<ToolbarButton key={action.label} action={action} />
			))}
			<span className={dividerClassName} aria-hidden="true" />
			{utilityActions.map((action) => (
				<ToolbarButton key={action.label} action={action} />
			))}
		</div>
	)
}

function ToolbarButton(props: { action: ToolbarAction }) {
	const { label, icon: Icon } = props.action
	const className = useStyles(toolbarButtonClass)

	return (
		<Tooltip content={label} placement="bottom" delay={400}>
			<button type="button" className={className} aria-label={label}>
				<Icon />
			</button>
		</Tooltip>
	)
}

const toolbarClass = style(
	shadow.subtle,
	radius.sm,
	flex({ align: "center", gap: 1 }),
	spacing.padding({ all: 1 }),
	{
		width: "fit-content",
		background: colors.gray[3],
	},
)

const toolbarDividerClass = style({
	width: "1px",
	height: "18px",
	marginInline: "4px",
	background: colors.gray[6],
})

const toolbarButtonClass = style(text("md", 400, "lowContrast"), radius.sm, {
	display: "grid",
	placeItems: "center",
	width: "28px",
	height: "28px",
	padding: 0,
	border: "none",
	background: "transparent",
	"& svg": {
		width: "20px",
		height: "20px",
	},
	"&:hover": {
		backgroundColor: colors.grayAlpha[4],
		color: colors.gray[12],
	},
})
