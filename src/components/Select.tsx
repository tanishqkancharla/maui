import type React from "react"
import {
	Button,
	FieldError,
	Label,
	Select as AriaSelect,
	SelectValue,
	Text,
	type SelectProps as AriaSelectProps,
	type ValidationResult,
} from "react-aria-components"
import { style, useStyles, type CSSProperties } from "purse-styles"
import { backgroundColor } from "../tokens/background"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { motion } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { CollectionPopover } from "./CollectionPopover"
import { ListBox, ListBoxItem, type ListBoxItemProps } from "./ListBox"
import { labelText } from "./Typography"

const selectClass = style({
	display: "flex",
	flexDirection: "column",
	gap: spacing.value(3),
	width: "100%",
})

const triggerClass = style(
	text("sm", 400, "highContrast"),
	focusRing("&:focus-visible", shadowVars.subtle),
	motion.standard("background", "border-color"),
	radius.sm,
	spacing.padding({ x: 4, y: 2 }),
	shadow.subtle,

	{
		display: "flex",
		alignItems: "center",
		height: "28px",
		minWidth: 0,
		color: colors.gray[12],
		border: "none",
		textAlign: "left",
		background: backgroundColor.element,
		"&:hover": {
			background: backgroundColor.elementHover,
		},
		"&[data-pressed]": {
			background: backgroundColor.elementHover,
		},
		"&[data-disabled]": {
			color: colors.gray[8],
			background: colors.gray[2],
		},
		"&[data-invalid]:not(:focus-visible)": {
			boxShadow: `0 0 0 1px light-dark(#ce2c31, #e5484d), ${shadowVars.subtle}`,
		},
	},
)

const valueClass = style({
	flex: "1 1 auto",
	minWidth: 0,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	"&[data-placeholder]": {
		color: colors.gray[8],
		fontStyle: "italic",
	},
})

const chevronClass = style(motion.standard("transform"), {
	flex: "0 0 auto",
	width: "14px",
	height: "14px",
	marginLeft: "6px",
	color: colors.gray[10],
	...({
		"[data-open] &": {
			transform: "rotate(180deg)",
		},
	} as CSSProperties),
})

const supportingTextClass = style(text("xs", 400, "lowContrast"), {
	margin: 0,
})

const errorClass = style(text("xs", 400, "highContrast"), {
	color: "light-dark(#ce2c31, #e5484d)",
})

export interface SelectProps<
	T,
	M extends "single" | "multiple" = "single",
> extends Omit<AriaSelectProps<T, M>, "children" | "className"> {
	label?: string
	description?: string
	errorMessage?: string | ((validation: ValidationResult) => string)
	items?: Iterable<T>
	children: React.ReactNode | ((item: T) => React.ReactNode)
}

export function Select<T, M extends "single" | "multiple" = "single">({
	label,
	description,
	errorMessage,
	items,
	children,
	...props
}: SelectProps<T, M>) {
	const className = useStyles(selectClass)
	const labelClassName = useStyles(labelText)
	const triggerClassName = useStyles(triggerClass)
	const valueClassName = useStyles(valueClass)
	const chevronClassName = useStyles(chevronClass)
	const supportingTextClassName = useStyles(supportingTextClass)
	const errorClassName = useStyles(errorClass)

	return (
		<AriaSelect {...props} className={className}>
			{label && <Label className={labelClassName}>{label}</Label>}
			<Button className={triggerClassName}>
				<SelectValue className={valueClassName} />
				<ChevronDown className={chevronClassName} />
			</Button>
			{description && (
				<Text slot="description" className={supportingTextClassName}>
					{description}
				</Text>
			)}
			<FieldError className={errorClassName}>{errorMessage}</FieldError>
			<CollectionPopover>
				<ListBox items={items}>{children}</ListBox>
			</CollectionPopover>
		</AriaSelect>
	)
}

export type SelectItemProps<T = object> = ListBoxItemProps<T>

export const SelectItem = ListBoxItem

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			viewBox="0 0 16 16"
			fill="none"
			{...props}
		>
			<path
				d="m4 6 4 4 4-4"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
