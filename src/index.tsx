import { css } from "goober"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { CliExperiment } from "./CliExperiment"
import { FuzzyString } from "./components/FuzzyString"
import { Input } from "./components/Input"
import { Listbox, MenuItem } from "./components/Menu"
import { Flex, Gap, Padding } from "./components/Utils"
import { Maui } from "./Maui"
import { fuzzyMatch } from "./utils/fuzzyMatch"

type Page = { name: string; component: React.FunctionComponent }

const pages: Page[] = [
	{ name: "Maui", component: Maui },
	{ name: "Command Line", component: CliExperiment },
]

const indexPageClass = css`
	width: 100vw;
	height: 100vh;
`

export function isDefined<T>(value: T | undefined): value is T {
	return value !== undefined
}

function Index() {
	const [value, setValue] = useState("")
	const [selectedPage, setSelectedPage] = useState<number | undefined>(
		undefined
	)
	const filteredSearchResults = pages
		.map((page, index) => {
			const match = fuzzyMatch(value, page.name)
			if (match) {
				return [index, match] as const
			}
		})
		.filter(isDefined)

	return (
		<div className={indexPageClass}>
			<Flex row alignItems="start">
				<Gap width={16} />
				<div
					style={{
						paddingTop: "150px",
						width: "250px",
						display: "flex",
						flexDirection: "column",
						alignItems: "stretch",
					}}
				>
					<Input
						placeholder="Search for experiments..."
						aria-label="Experiment Search"
						value={value}
						onChange={setValue}
					/>
					<Gap height={8} />
					<Listbox
						aria-label="Search Results"
						selectionMode="single"
						onSelectionChange={(keys) => {
							if (keys === "all") return
							setSelectedPage(keys.values().next().value)
						}}
					>
						{filteredSearchResults.map(([index, match]) => (
							<MenuItem key={index}>
								<FuzzyString match={match} />
							</MenuItem>
						))}
					</Listbox>
				</div>
				<ExperimentView index={selectedPage} />
			</Flex>
		</div>
	)
}

function ExperimentView(props: { index: number | undefined }) {
	return (
		<div style={{ height: "100vh", overflowY: "auto", width: "80%" }}>
			{props.index !== undefined && (
				<Padding xy={32}>{pages[props.index].component({})}</Padding>
			)}
		</div>
	)
}

function run() {
	const container = document.createElement("main")
	document.body.appendChild(container)
	ReactDOM.render(<Index />, container)
}

if (typeof window !== "undefined") {
	// If in browser context
	run()
}
