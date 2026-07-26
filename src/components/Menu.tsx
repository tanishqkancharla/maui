import { Children, type ReactElement } from "react"
import {
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	MenuTrigger as AriaMenuTrigger,
	type MenuItemProps as AriaMenuItemProps,
	type MenuProps as AriaMenuProps,
	type MenuTriggerProps as AriaMenuTriggerProps,
	type PopoverProps,
} from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { CollectionPopover } from "./CollectionPopover"
import { listBoxItemStyle, listBoxStyle } from "./ListBox"

const menuStyle = style(listBoxStyle, {
	minWidth: "140px",
})

const menuItemStyle = style(listBoxItemStyle, {
	"&[data-has-submenu]": {
		paddingRight: "28px",
	},
})

export interface MenuTriggerProps extends AriaMenuTriggerProps {
	children: [ReactElement, ReactElement]
	placement?: PopoverProps["placement"]
}

export function MenuTrigger({
	children,
	placement = "bottom start",
	...props
}: MenuTriggerProps) {
	const [trigger, menu] = Children.toArray(children) as [
		ReactElement,
		ReactElement,
	]

	return (
		<AriaMenuTrigger {...props}>
			{trigger}
			<CollectionPopover placement={placement}>
				{menu}
			</CollectionPopover>
		</AriaMenuTrigger>
	)
}

export interface MenuProps<T> extends Omit<AriaMenuProps<T>, "className"> {}

export function Menu<T>(props: MenuProps<T>) {
	const className = useStyles(menuStyle)

	return <AriaMenu {...props} className={className} />
}

export interface MenuItemProps<T = object>
	extends Omit<AriaMenuItemProps<T>, "className"> {}

export function MenuItem<T extends object = object>(props: MenuItemProps<T>) {
	const className = useStyles(menuItemStyle)
	const textValue =
		props.textValue ??
		(typeof props.children === "string" ? props.children : undefined)

	return <AriaMenuItem {...props} textValue={textValue} className={className} />
}
