import { css } from "goober"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { FuzzyString } from "./components/FuzzyString"
import { Input } from "./components/Input"
import { Listbox, MenuItem } from "./components/Menu"
import { H3, Link, P } from "./components/Typography"
import { Gap } from "./components/Utils"
import { CliExperiment } from "./pages/CliExperiment"
import { Maui } from "./pages/Maui"
import { fuzzyMatch } from "./utils/fuzzyMatch"
import { breakpoints } from "./utils/styles"

type Page = { name: string; component: React.FunctionComponent }

function About() {
	return (
		<>
			<H3>About this</H3>
			<P>
				This is a collection of various UX experiments I've worked on. They vary
				from a range of flexing my design skills to replicating UX I've found in
				other apps. For my main website, please visit{" "}
				<Link href="www.tanishqkancharla.dev">tanishqkancharla.dev</Link>
			</P>
		</>
	)
}

const pages: Page[] = [
	{ name: "About", component: About },
	{ name: "Maui", component: Maui },
	{ name: "Command Line", component: CliExperiment },
]

const indexPageClass = css`
	width: 100vw;
	height: 100vh;

	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 24px;
	gap: 16px;

	${breakpoints.mobile} {
		display: flex;
		flex-direction: row;
		align-items: start;
		gap: 32px;
		padding: 32px;
	}
`

export function isDefined<T>(value: T | undefined): value is T {
	return value !== undefined
}

const searchClass = css`
	display: flex;
	flex-direction: column;
	padding-top: 27px;
	width: 100%;

	${breakpoints.mobile} {
		max-width: 250px;
		padding-top: 27px;
	}
`

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
		<div className={indexPageClass}>
			<div className={searchClass}>
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
					selectedKeys={[selectedPage]}
				>
					{filteredSearchResults.map(([index, match]) => (
						<MenuItem key={index}>
							<FuzzyString match={match} />
						</MenuItem>
					))}
				</Listbox>
			</div>
			<ExperimentView index={selectedPage} />
		</div>
	)
}

const experimentViewClass = css`
	width: 100%;

	${breakpoints.mobile} {
		height: 100vh;
		overflow-y: "auto";
		width: "80%";
	}
`

function ExperimentView(props: { index: number | undefined }) {
	return (
		<div className={experimentViewClass}>
			{props.index !== undefined && pages[props.index].component({})}
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
