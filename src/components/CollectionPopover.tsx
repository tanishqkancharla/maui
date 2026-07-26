import {
	Popover,
	type PopoverProps,
} from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { backgroundColor } from "../tokens/background"
import { radius } from "../tokens/radius"
import { shadow } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"

const collectionPopoverStyle = style(
	radius.sm,
	shadow.strong,
	spacing.padding({ y: 1 }),
	{
		minWidth: "var(--trigger-width)",
		maxHeight: "280px",
		overflow: "hidden",
		background: backgroundColor.element,
	},
)

export interface CollectionPopoverProps
	extends Omit<PopoverProps, "className"> {}

export function CollectionPopover({
	placement = "bottom start",
	offset = 6,
	...props
}: CollectionPopoverProps) {
	const className = useStyles(collectionPopoverStyle)

	return (
		<Popover
			{...props}
			className={className}
			placement={placement}
			offset={offset}
		/>
	)
}
