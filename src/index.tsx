import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { PurseProvider, style, useStyles } from "purse-styles"
import { Maui } from "./pages/Maui"
import { UIDatabaseProvider } from "./UIDatabase/UIDatabase"
import { baseStyles } from "./utils/purseStyles"

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

const appStyles = style(
	{
		width: "100vw",
		height: "100vh",
		padding: "32px",
		margin: "0 auto",
		maxWidth: "1040px",
		background: "var(--sand-1)",
		color: "white",
		overflow: "hidden",
	},
	baseStyles.bodyText,
)

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
		<PurseProvider>
			<UIDatabaseProvider>
				<AppContent />
			</UIDatabaseProvider>
		</PurseProvider>
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
