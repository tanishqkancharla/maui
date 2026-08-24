import type React from "react"
import { iconSizeValues, type IconSize } from "../tokens/sizing"

export type { IconSize }

export type IconProps = React.SVGProps<SVGSVGElement> & {
	size?: IconSize
}

export function createIcon(
	displayName: string,
	Svg: React.ComponentType<React.SVGProps<SVGSVGElement>>,
) {
	function Icon({
		size = "sm",
		width,
		height,
		style,
		...props
	}: IconProps) {
		const box = iconSizeValues[size]
		return (
			<Svg
				{...props}
				width={width ?? box}
				height={height ?? box}
				style={{ flexShrink: 0, ...style }}
			/>
		)
	}
	Icon.displayName = displayName
	return Icon
}
