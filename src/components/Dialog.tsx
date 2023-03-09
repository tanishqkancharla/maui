import { animated, SpringConfig, useSpring } from "@react-spring/web"
import React from "react"
import { FocusScope } from "../hooks/useFocus"
import { style } from "../utils/styles"
import { Overlay } from "./Overlay"

type DialogProps = {
	children?: React.ReactNode
	onClickOutside?: () => void
}

const dialogStyle = style({
	//   `
	// 	flex: 1;
	// 	border: 2px solid var(--sand-5);
	// 	border-radius: 4px;
	// 	background-color: var(--sand-2);
	// 	margin: 15vh 20vw;
	// 	padding: 32px;
	// `
})

const springConfigs = {
	big: {
		tension: 700,
		friction: 50,

		// clamp: true,
	},
} satisfies Record<string, SpringConfig>

export function Dialog(props: DialogProps) {
	const dialogSprings = useSpring({
		config: springConfigs.big,
		from: {
			transform: "scale(0.95)",
			opacity: 0,
		} satisfies React.CSSProperties,
		to: { transform: "scale(1)", opacity: 1 } satisfies React.CSSProperties,
	})

	return (
		<Overlay onClickOutside={props.onClickOutside}>
			<FocusScope containBehavior="lock" autoFocus>
				<animated.div
					style={{
						...dialogSprings,
					}}
					className={dialogStyle}
				>
					{props.children}
				</animated.div>
			</FocusScope>
		</Overlay>
	)
}

type AnimatedComponentProps = {}

function AnimatedComponent(props: AnimatedComponentProps) {}
