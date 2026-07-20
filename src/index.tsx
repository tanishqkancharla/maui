import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import {
	PurseProvider,
	style,
	useInjectGlobalStyles,
	useStyles,
} from "purse-styles"
import { Maui } from "./pages/Maui"
import { ThemeProvider } from "./theme/ThemeContext"
import { UIDatabaseProvider } from "./UIDatabase/UIDatabase"
import { background, backgroundColor } from "./tokens/background"
import { colors } from "./tokens/colors"
import { baseTextStyle } from "./tokens/text"

Object.defineProperty(Array.prototype, "last", {
	get() {
		return this[this.length - 1]
	},
})

Object.defineProperty(Array.prototype, "first", {
	get() {
		return this[0]
	},
})

const appStyles = style(background.app, {
	width: "100vw",
	height: "100vh",
	padding: "32px",
	margin: "0 auto",
	maxWidth: "1040px",
	color: colors.gray[12],
	overflow: "hidden",
})

function GlobalStyles() {
	useInjectGlobalStyles(
		"*, *::after, *::before",
		{
			boxSizing: "border-box",
		},
		[],
	)
	useInjectGlobalStyles(
		"html, body",
		{
			margin: 0,
			backgroundColor: backgroundColor.app,
			...baseTextStyle,
		},
		[],
	)
	useInjectGlobalStyles(
		'button, [role="button"]',
		{
			cursor: "default",
		},
		[],
	)

	return null
}

function AppContent() {
	const className = useStyles(appStyles)

	return (
		<main className={className}>
			<Maui />
		</main>
	)
}

function App() {
	return (
		<ThemeProvider>
			<PurseProvider>
				<GlobalStyles />
				<UIDatabaseProvider>
					<AppContent />
				</UIDatabaseProvider>
			</PurseProvider>
		</ThemeProvider>
	)
}

function run() {
	const appRoot = document.querySelector("#app")
	if (!appRoot) {
		throw new Error("Could not find #app element in dom.")
	}

	const root = ReactDOM.createRoot(appRoot)

	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
}

run()
