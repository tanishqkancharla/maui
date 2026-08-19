import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { style, useStyles } from "purse-styles"
import { MauiProvider } from "./MauiProvider"
import { Maui } from "./pages/Maui"
import { background } from "./tokens/background"
import { colors } from "./tokens/colors"

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
	maxWidth: "1280px",
	color: colors.gray[12],
	overflow: "hidden",
})

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
		<MauiProvider>
			<AppContent />
		</MauiProvider>
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
