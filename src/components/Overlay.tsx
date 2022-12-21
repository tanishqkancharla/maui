import React, { useEffect, useMemo } from "react"
import ReactDOM from "react-dom"

export function Overlay(props: {
	children: React.ReactNode
	onClickOutside?: () => void
}) {
	const { onClickOutside } = props

	const overlayContainer = useMemo(() => document.createElement("div"), [])

	useEffect(() => {
		// Use append here so nested overlays show up in the right order
		document.body.appendChild(overlayContainer)
		return () => {
			document.body.removeChild(overlayContainer)
		}
	}, [overlayContainer])

	return ReactDOM.createPortal(
		<div
			style={{
				position: "fixed",
				top: "0",
				bottom: "0",
				right: "0",
				left: "0",
				width: "100vw",
				height: "100vh",
				// Make sure this is above other children
				zIndex: `${document.body.childElementCount}`,
			}}
			onMouseDown={(event) => {
				if (onClickOutside && event.currentTarget === event.target) {
					onClickOutside()
				}
				event.stopPropagation()
			}}
		>
			{props.children}
		</div>,

		overlayContainer
	)
}
