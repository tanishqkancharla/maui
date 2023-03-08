import { AnyReducers, useStateDispatch } from "use-state-dispatch"

type BreadcrumbsState = {
	pieces: string[]
	focusedPiece: string
}

const breadcrumbsReducers = {
	addPiece(state, piece: string) {
		const { pieces, focusedPiece } = state
		const index = pieces.indexOf(focusedPiece)
		const newPieces = [...pieces.slice(0, index + 1), piece]

		return {
			pieces: newPieces,
			focusedPiece: piece,
		}
	},
	focusPiece(state, piece: string) {
		if (state.focusedPiece === piece) return state
		return {
			...state,
			focusedPiece: piece,
		}
	},
} satisfies AnyReducers<BreadcrumbsState>

const possiblePieces = ["Home", "Nav", "Blog", "Thoughts"]

export function BreadcrumbsDemo() {
	const [state, dispatch] = useStateDispatch<
		BreadcrumbsState,
		typeof breadcrumbsReducers
	>({ pieces: ["Home"], focusedPiece: "Home" }, breadcrumbsReducers)

	const { pieces, focusedPiece } = state

	return (
		<div style={{ color: "wheat" }}>
			<nav style={{ listStyleType: "none" }}>
				<li style={{ display: "inline-block" }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="18"
						viewBox="0 0 18 18"
						width="18"
					>
						<title>S Home 18 N</title>
						<rect
							id="Canvas"
							fill="#ff13dc"
							opacity="0"
							width="18"
							height="18"
						/>
						<path
							style={{
								fill: "lightgray",
							}}
							className="fill"
							d="M17.666,10.125,9.375,1.834a.53151.53151,0,0,0-.75,0L.334,10.125a.53051.53051,0,0,0,0,.75l.979.9785A.5.5,0,0,0,1.6665,12H2v4.5a.5.5,0,0,0,.5.5h4a.5.5,0,0,0,.5-.5v-5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5v5a.5.5,0,0,0,.5.5h4a.5.5,0,0,0,.5-.5V12h.3335a.5.5,0,0,0,.3535-.1465l.979-.9785A.53051.53051,0,0,0,17.666,10.125Z"
						/>
					</svg>
				</li>
				{pieces.map((piece) => (
					<li
						onClick={() => {
							dispatch.focusPiece(piece)
						}}
						style={{
							display: "inline-block",
							color: focusedPiece === piece ? "lightgray" : "white",
							backgroundColor: focusedPiece === piece ? "darkgray" : undefined,
						}}
					>
						{piece}
					</li>
				))}
			</nav>
			<ul>
				{possiblePieces
					.filter((piece) => piece !== focusedPiece)
					.map((piece) => (
						<li
							style={{ display: "inline-block" }}
							onClick={() => dispatch.addPiece(piece)}
						>
							{piece}
						</li>
					))}
			</ul>
		</div>
	)
}
