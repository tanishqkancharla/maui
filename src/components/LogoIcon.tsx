import { style, useStyles } from "purse-styles"
import { iconSizeValues, type IconSize } from "../tokens/sizing"

export type LogoIconProps = {
	src: string
	size?: IconSize
	alt?: string
}

/**
 * Brand artwork in an icon-sized box. Defaults to md (18px, or 24px at Large
 * scale). Padding is included in the box and scales with it: 2px at 18px.
 * An empty alt makes the logo decorative; provide alt for standalone images.
 */
export function LogoIcon({ src, size = "md", alt = "" }: LogoIconProps) {
	const className = useStyles(logo)
	const box = iconSizeValues[size]

	return (
		<img
			src={src}
			alt={alt}
			aria-hidden={alt === "" ? true : undefined}
			className={className}
			style={{ width: box, height: box, padding: `calc(${box} / 9)` }}
		/>
	)
}

const logo = style({
	display: "block",
	boxSizing: "border-box",
	objectFit: "contain",
	flexShrink: 0,
})
