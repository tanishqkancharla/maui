import React, { useLayoutEffect, useRef, useState } from "react"
import { useLocale } from "react-aria"
import { Button as RACButton } from "react-aria-components"
import { style, useStyles } from "purse-styles"
import {
	backgroundColor,
	surfaceMixPercent,
	surfaceWash,
} from "../tokens/background"
import { colors } from "../tokens/colors"
import { controlSize } from "../tokens/sizing"
import { spacing } from "../tokens/spacing"
import { Button, buttonStyles } from "./Button"
import { Icons } from "./Icons"

export type TabBarItem = {
	id: string
	label: string
	icon?: React.ReactNode
	isClosable?: boolean
	/**
	 * Make this tab an HTML drag source. Pair with `onItemDragStart` /
	 * `onItemDragEnd` to wire a drop target (within the bar via `onReorder`,
	 * or a caller-owned target outside it).
	 */
	isDraggable?: boolean
}

export type TabBarProps = {
	items: readonly TabBarItem[]
	selectedId: string
	onSelectionChange: (id: string) => void
	onClose?: (id: string) => void
	/**
	 * Reorder within the bar: called with the dragged tab id and the tab it was
	 * dropped on. When set, the bar accepts drops on its tabs.
	 */
	onReorder?: (activeId: string, overId: string) => void
	/** Fires on dragstart for a tab with `isDraggable`. Use it to set drag data. */
	onItemDragStart?: (id: string, event: React.DragEvent<HTMLElement>) => void
	/** Fires on dragend for a tab with `isDraggable`. */
	onItemDragEnd?: (id: string, event: React.DragEvent<HTMLElement>) => void
	onAdd?: () => void
	addLabel?: string
	"aria-label": string
	className?: string
}

const tabBarClass = style({
	display: "flex",
	alignItems: "center",
	height: `calc(${controlSize.height} + ${spacing.value(3)} * 2)`,
	minWidth: 0,
	paddingInline: spacing.value(4),
	backgroundColor: backgroundColor.app,
	borderBottom: `1px solid ${colors.gray[6]}`,
})

const tabListClass = style({
	display: "flex",
	alignItems: "center",
	flex: "0 1 auto",
	minWidth: 0,
	paddingBlock: spacing.value(3),
	overflowX: "auto",
	overflowY: "hidden",
	scrollbarWidth: "none",
	"&::-webkit-scrollbar": {
		display: "none",
	},
	"& > div:has(button[data-hovered], button[aria-pressed='true']) + span": {
		backgroundColor: "transparent",
	},
	"& > span:has(+ div button[data-hovered]), & > span:has(+ div button[aria-pressed='true'])": {
		backgroundColor: "transparent",
	},
})

const quietTabHover = {
	color: colors.gray[12],
	backgroundColor: surfaceWash(
		colors.grayAlpha[9],
		surfaceMixPercent.hover,
	),
} as const

const tabClass = style({
	position: "relative",
	display: "flex",
	alignItems: "center",
	flex: "0 1 140px",
	width: "140px",
	minWidth: "56px",
	maxWidth: "140px",
	"&:not([data-selected='true']) > [data-close-control]": {
		opacity: 0,
		pointerEvents: "none",
	},
	"&:not([data-selected='true']):hover > [data-close-control]": {
		opacity: 1,
		pointerEvents: "auto",
	},
	"&:not([data-selected='true']):has(> button:first-child[data-hovered]) > [data-close-control], &:not([data-selected='true']):has(> [data-close-control][data-hovered]) > [data-close-control]":
		{
			opacity: 1,
			pointerEvents: "auto",
		},
	"&:not([data-selected='true']):hover > button:first-child": quietTabHover,
	"&:not([data-selected='true']):has(> button:first-child[data-hovered]) > button:first-child, &:not([data-selected='true']):has(> [data-close-control][data-hovered]) > button:first-child":
		quietTabHover,
	"&[data-selected='true'] > [data-close-control]:hover, &[data-selected='true'] > [data-close-control][data-hovered]":
		{
			backgroundColor: backgroundColor.elementHover,
		},
	"&[data-dragging='true']": { opacity: 0.5 },
})

const tabButtonClass = style({
	width: "100%",
	minWidth: 0,
	justifyContent: "flex-start",
	"& > span": {
		minWidth: 0,
		overflow: "hidden",
		textOverflow: "ellipsis",
		textBox: "normal",
		whiteSpace: "nowrap",
	},
})

const selectedTabButtonClass = style({
	backgroundColor: backgroundColor.element,
})

const closeButtonClass = style({
	position: "absolute",
	top: "50%",
	insetInlineEnd: spacing.value(1),
	zIndex: 1,
	width: controlSize.smHeight,
	minWidth: controlSize.smHeight,
	maxWidth: controlSize.smHeight,
	flexShrink: 0,
	transform: "translateY(-50%)",
})

const separatorClass = style({
	flex: "0 0 auto",
	width: "0.5px",
	height: "14px",
	backgroundColor: colors.gray[6],
})

const addButtonClass = style({
	flex: "0 0 auto",
	marginInlineStart: spacing.value(2),
})

export function TabBar({
	items,
	selectedId,
	onSelectionChange,
	onClose,
	onReorder,
	onItemDragStart,
	onItemDragEnd,
	onAdd,
	addLabel = "New tab",
	"aria-label": ariaLabel,
	className,
}: TabBarProps) {
	const { direction } = useLocale()
	const buttons = useRef(new Map<string, HTMLButtonElement>())
	const focusSelectedAfterClose = useRef(false)
	const draggingIdRef = useRef<string | null>(null)
	const [draggingId, setDraggingId] = useState<string | null>(null)
	const tabBarClassName = useStyles(tabBarClass)
	const tabListClassName = useStyles(tabListClass)
	const tabClassName = useStyles(tabClass)
	const selectedTabButtonClassName = useStyles(
		buttonStyles.base,
		selectedTabButtonClass,
		tabButtonClass,
	)
	const quietTabButtonClassName = useStyles(
		buttonStyles.quiet,
		tabButtonClass,
	)
	const tabTextClassName = useStyles(buttonStyles.text)
	const closeButtonClassName = useStyles(closeButtonClass)
	const separatorClassName = useStyles(separatorClass)
	const addButtonClassName = useStyles(addButtonClass)

	useLayoutEffect(() => {
		if (!focusSelectedAfterClose.current) return
		focusSelectedAfterClose.current = false
		buttons.current.get(selectedId)?.focus()
	}, [items, selectedId])

	function closeTab(id: string) {
		if (!onClose) return
		focusSelectedAfterClose.current = true
		onClose(id)
	}

	function isDraggable(item: TabBarItem) {
		return item.isDraggable ?? onItemDragStart !== undefined
	}

	function onTabDragStart(
		item: TabBarItem,
		event: React.DragEvent<HTMLDivElement>,
	) {
		// The close control sits inside the draggable tab; don't drag from it.
		if (
			event.target instanceof Element &&
			event.target.closest("[data-close-control]")
		) {
			event.preventDefault()
			return
		}
		draggingIdRef.current = item.id
		setDraggingId(item.id)
		event.dataTransfer.effectAllowed = "move"
		// Firefox aborts a drag when the store is empty; seed a default so
		// onReorder-only callers work. Consumers can add their own types.
		event.dataTransfer.setData("text/plain", item.id)
		onItemDragStart?.(item.id, event)
	}

	function onTabDragEnd(
		item: TabBarItem,
		event: React.DragEvent<HTMLDivElement>,
	) {
		draggingIdRef.current = null
		setDraggingId(null)
		onItemDragEnd?.(item.id, event)
	}

	function onTabDragOver(
		item: TabBarItem,
		event: React.DragEvent<HTMLDivElement>,
	) {
		if (onReorder === undefined) return
		const active = draggingIdRef.current
		if (active === null || active === item.id) return
		event.preventDefault()
		// The bar handled this drop; don't also run an ancestor drop target.
		event.stopPropagation()
		event.dataTransfer.dropEffect = "move"
	}

	function onTabDrop(item: TabBarItem, event: React.DragEvent<HTMLDivElement>) {
		if (onReorder === undefined) return
		const active = draggingIdRef.current
		if (active === null || active === item.id) return
		event.preventDefault()
		event.stopPropagation()
		draggingIdRef.current = null
		setDraggingId(null)
		onReorder(active, item.id)
	}

	function selectAt(index: number) {
		const item = items[index]
		if (!item) return
		onSelectionChange(item.id)
		buttons.current.get(item.id)?.focus()
	}

	function onTabKeyDown(
		event: React.KeyboardEvent<HTMLButtonElement>,
		index: number,
		item: TabBarItem,
	) {
		let nextIndex: number | undefined
		if (event.key === "Home") nextIndex = 0
		if (event.key === "End") nextIndex = items.length - 1
		if (event.key === "ArrowRight") {
			nextIndex =
				(index + (direction === "rtl" ? -1 : 1) + items.length) % items.length
		}
		if (event.key === "ArrowLeft") {
			nextIndex =
				(index + (direction === "rtl" ? 1 : -1) + items.length) % items.length
		}
		if (
			(event.key === "Delete" || event.key === "Backspace") &&
			item.id === selectedId &&
			item.isClosable &&
			onClose
		) {
			event.preventDefault()
			closeTab(item.id)
			return
		}
		if (nextIndex === undefined) return
		event.preventDefault()
		selectAt(nextIndex)
	}

	return (
		<div className={[tabBarClassName, className].filter(Boolean).join(" ")}>
			<div className={tabListClassName} role="toolbar" aria-label={ariaLabel}>
				{items.map((item, index) => {
					const selected = item.id === selectedId
					const reserveClose = Boolean(item.isClosable && onClose)

					return (
						<React.Fragment key={item.id}>
							<div
								className={tabClassName}
								data-selected={selected ? "true" : undefined}
								data-dragging={draggingId === item.id ? "true" : undefined}
								draggable={isDraggable(item)}
								onDragStart={(event) => onTabDragStart(item, event)}
								onDragEnd={(event) => onTabDragEnd(item, event)}
								onDragOver={(event) => onTabDragOver(item, event)}
								onDrop={(event) => onTabDrop(item, event)}
							>
								<RACButton
									ref={(element) => {
										if (element) buttons.current.set(item.id, element)
										else buttons.current.delete(item.id)
									}}
									aria-pressed={selected}
									excludeFromTabOrder={!selected}
									className={
										selected
											? selectedTabButtonClassName
											: quietTabButtonClassName
									}
									style={reserveClose ? { paddingInlineEnd: "32px" } : undefined}
									onPress={() => onSelectionChange(item.id)}
									onKeyDown={(event) => onTabKeyDown(event, index, item)}
								>
									{item.icon}
									<span className={tabTextClassName}>{item.label}</span>
								</RACButton>
								{reserveClose && (
									<Button
										size="sm"
										variant="quiet"
										aria-label={`Close ${item.label}`}
										data-close-control
										excludeFromTabOrder={!selected}
										className={closeButtonClassName}
										onPress={() => closeTab(item.id)}
									>
										<Icons.Close />
									</Button>
								)}
							</div>
							{index < items.length - 1 && (
								<span className={separatorClassName} aria-hidden="true" />
							)}
						</React.Fragment>
					)
				})}
			</div>
			{onAdd && (
				<Button
					size="sm"
					variant="quiet"
					aria-label={addLabel}
					className={addButtonClassName}
					onPress={onAdd}
				>
					<Icons.Plus />
				</Button>
			)}
		</div>
	)
}
