import {
	useCallback,
	useState,
	type ComponentPropsWithoutRef,
	type ReactNode,
} from "react"
import {
	AnimatePresence,
	motion,
	useReducedMotion,
	type Transition,
} from "motion/react"
import {
	Dialog as AriaDialog,
	Heading,
	Modal,
	ModalOverlay,
} from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { background } from "../tokens/background"
import { border } from "../tokens/borders"
import { overlayMotion } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { cls } from "../utils/cls"

export type DialogSize = "sm" | "md" | "lg"

export type DialogProps = {
	children: ReactNode
	isOpen?: boolean
	defaultOpen?: boolean
	onOpenChange?: (isOpen: boolean) => void
	/** Enables outside-click dismissal. Escape remains enabled by default. */
	isDismissable?: boolean
	isKeyboardDismissDisabled?: boolean
	size?: DialogSize
	role?: "dialog" | "alertdialog"
	"aria-label"?: string
	"aria-labelledby"?: string
	className?: string
}

const MotionModalOverlay = motion.create(ModalOverlay)
const MotionModal = motion.create(Modal)

const dialogEnterTransition: Transition = {
	type: "spring",
	visualDuration: overlayMotion.dialogEnter.durationMs / 1000,
	bounce: overlayMotion.dialogEnter.bounce,
}

const dialogExitTransition: Transition = {
	duration: overlayMotion.dialogExit.durationMs / 1000,
	ease: "easeIn",
}

const backdropTransition: Transition = {
	duration: overlayMotion.backdrop.durationMs / 1000,
	ease: "easeInOut",
}

const reducedMotionTransition: Transition = {
	duration: overlayMotion.reduced.durationMs / 1000,
	ease: "easeInOut",
}

const overlayClass = style({
	position: "fixed",
	inset: 0,
	zIndex: 1200,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	boxSizing: "border-box",
	padding: spacing.value(8),
	backgroundColor: "rgb(0 0 0 / 0.1)",
	overflow: "auto",
	overscrollBehavior: "contain",
})

const surfaceClass = style(
	background.element,
	border([], "outline"),
	radius.lg,
	{
		width: "min(440px, calc(100vw - 32px))",
		maxWidth: "100%",
		maxHeight: "calc(100dvh - 32px)",
		display: "flex",
		flexDirection: "column",
		boxSizing: "border-box",
		padding: spacing.value(12),
		overflow: "hidden",
		outline: "none",
		transformOrigin: "center",
		willChange: "opacity, transform",
	},
)

const surfaceSizeClasses = {
	sm: style({ width: "min(440px, calc(100vw - 32px))" }),
	md: style({ width: "min(640px, calc(100vw - 32px))" }),
	lg: style({ width: "min(960px, calc(100vw - 32px))" }),
} satisfies Record<DialogSize, ReturnType<typeof style>>

const dialogClass = style({
	minWidth: 0,
	minHeight: 0,
	display: "flex",
	flexDirection: "column",
	gap: spacing.value(8),
	outline: "none",
})

const titleClass = style(text({ size: "lg", fontWeight: 600 }), {
	margin: 0,
})

const bodyClass = style({
	minWidth: 0,
	minHeight: 0,
	overflowY: "auto",
})

const actionsClass = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	flexWrap: "wrap",
	gap: spacing.value(4),
})

export function Dialog({
	children,
	isOpen: isOpenProp,
	defaultOpen = false,
	onOpenChange,
	isDismissable = true,
	isKeyboardDismissDisabled,
	size = "sm",
	role = "dialog",
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledby,
	className,
}: DialogProps) {
	const isControlled = isOpenProp !== undefined
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
	const isOpen = isControlled ? isOpenProp : uncontrolledOpen
	const reduceMotion = Boolean(useReducedMotion())
	const overlayClassName = useStyles(overlayClass)
	const surfaceClassName = useStyles(surfaceClass, surfaceSizeClasses[size])
	const dialogClassName = useStyles(dialogClass)
	const setOpen = useCallback(
		(next: boolean) => {
			if (!isControlled) {
				setUncontrolledOpen(next)
			}
			onOpenChange?.(next)
		},
		[isControlled, onOpenChange],
	)
	const enterTransition = reduceMotion
		? reducedMotionTransition
		: dialogEnterTransition
	const exitTransition = reduceMotion
		? reducedMotionTransition
		: dialogExitTransition
	const scale = reduceMotion ? 1 : 0.98

	return (
		<AnimatePresence>
			{isOpen && (
				<MotionModalOverlay
					isOpen
					onOpenChange={setOpen}
					isDismissable={isDismissable}
					isKeyboardDismissDisabled={isKeyboardDismissDisabled}
					className={overlayClassName}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={
						reduceMotion ? reducedMotionTransition : backdropTransition
					}
				>
					<MotionModal
						className={cls(surfaceClassName, className)}
						initial={{ opacity: 0, scale }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale, transition: exitTransition }}
						transition={enterTransition}
					>
						<AriaDialog
							role={role}
							aria-label={ariaLabel}
							aria-labelledby={ariaLabelledby}
							className={dialogClassName}
						>
							{children}
						</AriaDialog>
					</MotionModal>
				</MotionModalOverlay>
			)}
		</AnimatePresence>
	)
}

export type DialogTitleProps = Omit<
	ComponentPropsWithoutRef<typeof Heading>,
	"slot"
>

export function DialogTitle({ className, ...props }: DialogTitleProps) {
	const titleClassName = useStyles(titleClass)
	return (
		<Heading
			{...props}
			slot="title"
			className={cls(titleClassName, className)}
		/>
	)
}

export type DialogBodyProps = ComponentPropsWithoutRef<"div">

export function DialogBody({ className, ...props }: DialogBodyProps) {
	const bodyClassName = useStyles(bodyClass)
	return <div {...props} className={cls(bodyClassName, className)} />
}

export type DialogActionsProps = ComponentPropsWithoutRef<"div">

export function DialogActions({ className, ...props }: DialogActionsProps) {
	const actionsClassName = useStyles(actionsClass)
	return <div {...props} className={cls(actionsClassName, className)} />
}
