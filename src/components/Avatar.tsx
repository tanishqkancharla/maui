import { style, useStyles } from "purse-styles"
import { radius } from "../tokens/radius"
import { text, type TextSize } from "../tokens/text"
import { memoize } from "../utils/memoize"

type AvatarProps = {
	name: string
	size?: TextSize
	className?: string
}

export function Avatar({ name, size = "sm", className }: AvatarProps) {
	const avatarClassName = useStyles(avatarClass(name, size))

	return (
		<span
			className={joinClassNames(avatarClassName, className)}
			aria-hidden="true"
		>
			{initials(name)}
		</span>
	)
}

const avatarPalette = [
	{ background: "var(--accent-4)", color: "var(--accent-11)" },
	{ background: "hsl(160, 35%, 22%)", color: "hsl(160, 60%, 78%)" },
	{ background: "hsl(24, 40%, 22%)", color: "hsl(24, 80%, 78%)" },
	{ background: "hsl(320, 30%, 22%)", color: "hsl(320, 70%, 80%)" },
] as const

// Avatar dimensions correspond to the text-size scale, so an avatar sits
// naturally next to text of the same size. "sm" is the common 18px size.
const avatarDimensions: Record<TextSize, string> = {
	"2xs": "14px",
	xs: "16px",
	sm: "18px",
	md: "20px",
	lg: "24px",
	xl: "32px",
}

// Initials sit well below the box size so they read as a compact monogram
// rather than filling the circle.
const avatarInitialsFontSize: Record<TextSize, string> = {
	"2xs": "6px",
	xs: "7px",
	sm: "8px",
	md: "9px",
	lg: "10px",
	xl: "13px",
}

function initials(name: string) {
	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("")
}

function avatarColorIndex(seed: string) {
	let hash = 0
	for (let index = 0; index < seed.length; index += 1) {
		hash = seed.charCodeAt(index) + ((hash << 5) - hash)
	}
	return Math.abs(hash) % avatarPalette.length
}

const avatarClass = memoize((seed: string, size: TextSize) => {
	const palette = avatarPalette[avatarColorIndex(seed)]

	return style(text("2xs", 600, "highContrast"), radius.circle, {
		display: "grid",
		placeItems: "center",
		flexShrink: 0,
		width: avatarDimensions[size],
		height: avatarDimensions[size],
		fontSize: avatarInitialsFontSize[size],
		lineHeight: 1,
		backgroundColor: palette.background,
		color: palette.color,
	})
})

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
