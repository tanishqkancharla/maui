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
import { controlSize, iconSizeValues } from "../tokens/sizing"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { CollectionPopover } from "./CollectionPopover"
import { ListBox, ListBoxItem, type ListBoxItemProps } from "./ListBox"
import { labelText } from "./Typography"

const root = style({
	display: "flex",
	flexDirection: "column",
	gap: spacing.value(3),
	width: "100%",
})

const trigger = style(
	text({ size: "sm", fontWeight: 400, color: "highContrast" }),
	focusRing("&:focus-visible", shadowVars.control),
	radius.sm,
	spacing.padding({ x: 4, y: 2 }),
	shadow.control,

	{
		display: "flex",
		alignItems: "center",
		height: controlSize.height,
		minWidth: 0,
		color: colors.gray[12],
		border: "none",
		textAlign: "left",
		background: backgroundColor.element,
		"&:hover, &[data-pressed]": {
			background: backgroundColor.elementHover,
		},
		"&[aria-expanded='true']": {
			background: backgroundColor.elementHover,
		},
		"&[data-disabled]": {
			color: colors.gray[8],
			background: colors.gray[2],
		},
		"&[data-invalid]:not(:focus-visible)": {
			boxShadow: `0 0 0 1px light-dark(#ce2c31, #e5484d), ${shadowVars.control}`,
		},
	},
)

const value = style({
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

const chevron = style(motion.standard("transform"), {
	flex: "0 0 auto",
	width: iconSizeValues.xs,
	height: iconSizeValues.xs,
	marginLeft: spacing.value(3),
	color: colors.gray[10],
	...({
		"[data-open] &": {
			transform: "rotate(180deg)",
		},
	} as CSSProperties),
})

const descriptionText = style(
	text({ size: "xs", fontWeight: 400, color: "lowContrast" }),
	{
		margin: 0,
	},
)

const error = style(
	text({ size: "xs", fontWeight: 400, color: "highContrast" }),
	{
		color: "light-dark(#ce2c31, #e5484d)",
	},
)

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

/** `root` on RAC `Select`; `label` on RAC `Label`; `trigger` on RAC `Button` (`data-pressed`, `aria-expanded`, `data-disabled`, `data-invalid`, `:focus-visible`); `value` on RAC `SelectValue` (`data-placeholder`); `chevron` on an icon inside the trigger (rotates under the `[data-open]` Select root); `description` on RAC `Text slot="description"`; `error` on RAC `FieldError`. */
export const selectStyles = {
	root,
	label: labelText,
	trigger,
	value,
	chevron,
	description: descriptionText,
	error,
} as const

export function Select<T, M extends "single" | "multiple" = "single">({
	label,
	description,
	errorMessage,
	items,
	children,
	...props
}: SelectProps<T, M>) {
	const className = useStyles(selectStyles.root)
	const labelClassName = useStyles(selectStyles.label)
	const triggerClassName = useStyles(selectStyles.trigger)
	const valueClassName = useStyles(selectStyles.value)
	const chevronClassName = useStyles(selectStyles.chevron)
	const supportingTextClassName = useStyles(selectStyles.description)
	const errorClassName = useStyles(selectStyles.error)

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
