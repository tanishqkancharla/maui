import { StrictMode, lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { style, useStyles } from "purse-styles"
import { MauiProvider } from "./MauiProvider"
import { Maui } from "./pages/Maui"
import { background } from "./tokens/background"
import { colors } from "./tokens/colors"

const AgentationDev = import.meta.env.DEV
	? lazy(() =>
			import("./dev/AgentationDev").then((module) => ({
				default: module.AgentationDev,
			})),
		)
	: () => null

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
			{import.meta.env.DEV && (
				<Suspense fallback={null}>
					<AgentationDev />
				</Suspense>
			)}
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
