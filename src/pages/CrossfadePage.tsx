import { useState } from "react"
import { Button } from "../components/Button"
import { Crossfade, type CrossfadeDirection } from "../components/Crossfade"
import { CodeBlock } from "../components/CodeBlock"
import { Icons } from "../components/Icons"
import { Panel } from "./Panel"
import { Prose } from "../components/Prose"
import { RadioOption, RadioOptionGroup } from "../components/Radio"
import { Text } from "../components/Text"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"

type PlaygroundDirection = "none" | CrossfadeDirection

const playgroundDirections: PlaygroundDirection[] = [
	"none",
	"up",
	"down",
	"left",
	"right",
]

const slides = [
	{
		id: "inbox",
		title: "Inbox",
		body: "Unread mail waits in a single stream, newest first.",
	},
	{
		id: "calendar",
		title: "Calendar",
		body: "The week view keeps today pinned to the first column.",
	},
	{
		id: "notes",
		title: "Notes",
		body: "A quiet page for drafting, without extra chrome.",
	},
	{
		id: "search",
		title: "Search",
		body: "Jump to a person, file, or a recent thread.",
	},
] as const

function isPlaygroundDirection(value: string): value is PlaygroundDirection {
	return (playgroundDirections as readonly string[]).includes(value)
}

export function CrossfadePage() {
	const [direction, setDirection] = useState<PlaygroundDirection>("none")
	const [index, setIndex] = useState(0)
	const slide = slides[index] ?? slides[0]
	const travel = direction === "none" ? undefined : direction

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Crossfade</H2>
			<P>
				When <code>contentKey</code> changes, the previous view fades out
				and the next fades in. Omit <code>direction</code> for an in-place
				opacity fade — same position, no slide. Pass{" "}
				<code>up</code>, <code>down</code>, <code>left</code>, or{" "}
				<code>right</code> to keep the directional crossfade: the previous
				view exits that way while the next enters from the opposite side.{" "}
				<code>contentKey</code> is required — putting <code>key</code> on
				Crossfade itself remounts the wrapper and skips the exit.
			</P>

			<H3>Playground</H3>
			<Panel>
				<Flex column gap={8}>
					<RadioOptionGroup
						label="Direction"
						value={direction}
						onChange={(value) => {
							if (isPlaygroundDirection(value)) {
								setDirection(value)
							}
						}}
					>
						<RadioOption value="none">None</RadioOption>
						<RadioOption value="up">Up</RadioOption>
						<RadioOption value="down">Down</RadioOption>
						<RadioOption value="left">Left</RadioOption>
						<RadioOption value="right">Right</RadioOption>
					</RadioOptionGroup>

					<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
						<Button
							aria-label="Previous slide"
							onClick={() =>
								setIndex((current) =>
									current === 0 ? slides.length - 1 : current - 1,
								)
							}
						>
							<Icons.ChevronLeft />
							Previous
						</Button>
						<Button
							aria-label="Next slide"
							onClick={() =>
								setIndex((current) => (current + 1) % slides.length)
							}
						>
							Next
							<Icons.ChevronRight />
						</Button>
						{slides.map((item, slideIndex) => (
							<Button
								key={item.id}
								variant={slideIndex === index ? "primary" : "quiet"}
								onClick={() => setIndex(slideIndex)}
							>
								{item.title}
							</Button>
						))}
					</Flex>

					<Flex
						column
						p={6}
						shadow="subtle"
						radius="sm"
						style={{ minHeight: "108px" }}
					>
						<Crossfade direction={travel} contentKey={slide.id}>
							<Flex column gap={3}>
								<Text size="lg" fontWeight={600}>
									{slide.title}
								</Text>
								<Text color="lowContrast">{slide.body}</Text>
							</Flex>
						</Crossfade>
					</Flex>
				</Flex>
			</Panel>

			<H3>Usage</H3>
			<CodeBlock lang="tsx">{`const [index, setIndex] = useState(0)
const slide = slides[index]

<Crossfade contentKey={slide.id}>
	<Text size="lg">{slide.title}</Text>
</Crossfade>

<Crossfade direction="left" contentKey={slide.id}>
	<Text size="lg">{slide.title}</Text>
</Crossfade>`}</CodeBlock>
		</Prose>
	)
}
