import { renderMermaidSVG, type RenderOptions } from "beautiful-mermaid"
import { useMemo, useState, type ComponentPropsWithoutRef } from "react"
import { style, useStyles } from "purse-styles"
import { Close, Copy, Fullscreen, LinkIcon } from "../icons/root"
import { backgroundColor } from "../tokens/background"
import { colors } from "../tokens/colors"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { cls } from "../utils/cls"
import { Button } from "./Button"
import { Dialog } from "./Dialog"
import { Tooltip } from "./Tooltip"

export type MermaidDiagramProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children"
> & {
	source: string
}

const mauiMermaidTheme = {
	bg: backgroundColor.app,
	fg: colors.gray[12],
	line: colors.gray[8],
	accent: colors.accent[9],
	muted: colors.gray[11],
	surface: backgroundColor.element,
	border: colors.gray[7],
	font: "system-ui",
	transparent: true,
} satisfies RenderOptions

const beautifulMermaidEditor = "https://agents.craft.do/mermaid/editor"

export function beautifulMermaidEditorUrl(source: string): string {
	const bytes = new TextEncoder().encode(JSON.stringify({ source }))
	let binary = ""
	const chunkSize = 0x8000
	for (let offset = 0; offset < bytes.length; offset += chunkSize) {
		binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize))
	}
	return `${beautifulMermaidEditor}#${btoa(binary)}`
}

const containerClass = style({
	position: "relative",
	maxWidth: "100%",
})

const diagramClass = style({
	maxWidth: "100%",
	overflowX: "auto",
	"& svg": {
		display: "block",
		height: "auto",
		maxWidth: "100%",
		minWidth: "720px",
	},
})

const actionsClass = style({
	position: "absolute",
	top: spacing.value(3),
	right: spacing.value(3),
	zIndex: 1,
	display: "flex",
	gap: spacing.value(2),
})

const dialogContentClass = style({
	position: "relative",
	minWidth: 0,
	paddingTop: spacing.value(16),
})

const errorClass = style(
	text({ size: "xs", color: "lowContrast", monospace: true }),
	spacing.padding({ all: 6 }),
	radius.sm,
	{
		backgroundColor: colors.gray[3],
		whiteSpace: "pre-wrap",
	},
)

export function MermaidDiagram({
	source,
	className,
	"aria-label": ariaLabel = "Mermaid diagram",
	...props
}: MermaidDiagramProps) {
	const [dialogOpen, setDialogOpen] = useState(false)
	const containerClassName = useStyles(containerClass)
	const diagramClassName = useStyles(diagramClass)
	const actionsClassName = useStyles(actionsClass)
	const dialogContentClassName = useStyles(dialogContentClass)
	const errorClassName = useStyles(errorClass)
	const result = useMemo(() => {
		try {
			return { svg: renderMermaidSVG(source, mauiMermaidTheme), error: null }
		} catch (error) {
			return {
				svg: null,
				error: error instanceof Error ? error.message : String(error),
			}
		}
	}, [source])

	return (
		<>
			<div
				{...props}
				className={cls("maui-mermaid-diagram", containerClassName, className)}
			>
				<div className={actionsClassName}>
					<Tooltip content="Open in Beautiful Mermaid" placement="top">
						<Button
							aria-label="Open in Beautiful Mermaid"
							size="sm"
							onClick={() => {
								window.open(
									beautifulMermaidEditorUrl(source),
									"_blank",
									"noopener,noreferrer",
								)
							}}
						>
							<LinkIcon />
						</Button>
					</Tooltip>
					<Tooltip content="Copy Mermaid source" placement="top">
						<Button
							aria-label="Copy Mermaid source"
							size="sm"
							onClick={() => {
								void navigator.clipboard.writeText(source)
							}}
						>
							<Copy />
						</Button>
					</Tooltip>
					<Tooltip content="View fullscreen" placement="top">
						<Button
							aria-label="View fullscreen"
							size="sm"
							onClick={() => setDialogOpen(true)}
						>
							<Fullscreen />
						</Button>
					</Tooltip>
				</div>
				{result.error ? (
					<div className={errorClassName} role="alert">
						{result.error}
					</div>
				) : (
					<div
						aria-label={ariaLabel}
						className={diagramClassName}
						role="img"
						dangerouslySetInnerHTML={{ __html: result.svg ?? "" }}
					/>
				)}
			</div>
			<Dialog
				aria-label={`${ariaLabel} fullscreen`}
				isOpen={dialogOpen}
				onOpenChange={setDialogOpen}
				size="lg"
			>
				<div className={dialogContentClassName}>
					<div className={actionsClassName}>
						<Tooltip content="Close" placement="top">
							<Button
								aria-label="Close fullscreen dialog"
								size="sm"
								slot="close"
							>
								<Close />
							</Button>
						</Tooltip>
					</div>
					{result.error ? (
						<div className={errorClassName} role="alert">
							{result.error}
						</div>
					) : (
						<div
							aria-label={`${ariaLabel} fullscreen`}
							className={diagramClassName}
							role="img"
							dangerouslySetInnerHTML={{ __html: result.svg ?? "" }}
						/>
					)}
				</div>
			</Dialog>
		</>
	)
}
