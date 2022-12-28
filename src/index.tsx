import React, { StrictMode, useState } from "react"
import ReactDOM from "react-dom/client"
import { Item } from "react-stately"
import { FuzzyString } from "./components/FuzzyString"
import { TextField } from "./components/Input"
import { ListBox } from "./components/Menu"
import { Gap } from "./components/Utils"
import { About } from "./pages/About"
import { CliExperiment } from "./pages/CliExperiment"
import { FluidCursorEditor } from "./pages/FluidCursorEditor"
import { ManagedFocusDemo } from "./pages/ManagedFocusDemo"
import { ManagedFocusScopesDemo } from "./pages/ManagedFocusScopeDemo"
import { Maui } from "./pages/Maui"
import { UIDatabaseProvider } from "./UIDatabase/UIDatabase"
import { fuzzyMatch } from "./utils/fuzzyMatch"

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

type Page = { name: string; component: React.FunctionComponent }

const pages: Page[] = [
	{ name: "About", component: About },
	{ name: "Maui", component: Maui },
	{ name: "Command Line", component: CliExperiment },
	{ name: "Fluid Cursor Editor", component: FluidCursorEditor },
	{ name: "Managed Focus", component: ManagedFocusDemo },
	{ name: "Managed Focus Scopes", component: ManagedFocusScopesDemo },
]
export function isDefined<T>(value: T | undefined): value is T {
	return value !== undefined
}

function Index() {
	const [value, setValue] = useState("")
	const [selectedPage, setSelectedPage] = useState<number>(0)
	const filteredSearchResults = pages
		.map((page, index) => {
			const match = fuzzyMatch(value, page.name)
			if (match) {
				return [index, match] as const
			}
		})
		.filter(isDefined)

	return (
		<div className="w-screen h-screen flex flex-col items-stretch p-6 gap-4 sm:flex-row sm:items-start sm:gap-8 sm:p-8">
			<div className="flex flex-col pt-[27px] w-full sm:max-w-[250px]">
				<TextField
					placeholder="Search for experiments..."
					aria-label="Experiment Search"
					value={value}
					onChange={setValue}
				/>
				<Gap height={8} />
				<ListBox
					aria-label="Search Results"
					defaultSelectedKeys={[selectedPage]}
					selectionMode="single"
					onSelectionChange={(keys) => {
						if (keys === "all") return
						setSelectedPage(keys.values().next().value)
					}}
					disallowEmptySelection
				>
					{filteredSearchResults.map(([index, match]) => (
						<Item key={index}>
							<FuzzyString match={match} />
						</Item>
					))}
				</ListBox>
			</div>
			<ExperimentView index={selectedPage} />
		</div>
	)
}

function ExperimentView(props: { index: number | undefined }) {
	return (
		<div className="w-full sm:h-screen sm:overflow-y-auto sm:w-4/5">
			{props.index !== undefined && pages[props.index].component({})}
		</div>
	)
}

function App() {
	return (
		<UIDatabaseProvider>
			<Index />
		</UIDatabaseProvider>
	)
}

function run() {
	const appRoot = document.querySelector("body")
	if (!appRoot) {
		throw new Error("Could not find body element in dom.")
	}
	const root = ReactDOM.createRoot(appRoot)

	root.render(
		<StrictMode>
			<App />
		</StrictMode>
	)
}

run()
