import type React from "react"

type PanelProps = React.ComponentPropsWithoutRef<"div">

export function Panel({ className, children, ...props }: PanelProps) {
	return (
		<div
			{...props}
			className={["maui-example-panel", className].filter(Boolean).join(" ")}
		>
			{children}
		</div>
	)
}
