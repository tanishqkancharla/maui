import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "storybook/test"
import { ProseSpacingPlayground } from "./ProseSpacingPlayground"

const meta = {
	title: "Prose/Spacing",
	component: ProseSpacingPlayground,
} satisfies Meta<typeof ProseSpacingPlayground>

export default meta
type Story = StoryObj<typeof meta>

const choose = (group: string, option: string) =>
	(async ({ canvasElement }) => {
		const radios = within(canvasElement).getByRole("radiogroup", { name: group })
		await userEvent.click(within(radios).getByRole("radio", { name: option }))
	}) satisfies Story["play"]

const note = (story: string) => ({ docs: { description: { story } } })

export const Default: Story = {
	parameters: note(
		"Default size on the desktop scale. Labels in the right gutter measure each gap: accent bars are heading breaks and hugs, gray bars are the fixed 10px paragraph gap.",
	),
}

export const Small: Story = {
	play: choose("Size", "Small"),
	parameters: note(
		"Small size. Heading breaks and hugs shrink with the type; paragraphs stay 10px apart.",
	),
}

export const SmallTouch: Story = {
	play: choose("Scale", "Touch"),
	parameters: note(
		"Small size on the touch scale. Type and heading gaps grow about 1.25×; paragraphs stay 10px apart.",
	),
}

export const Large: Story = {
	play: choose("Size", "Large"),
	parameters: note(
		"Large size. Heading breaks reach 56px and hugs 40px for h1; paragraphs stay 10px apart.",
	),
}

export const LargeTouch: Story = {
	play: choose("Scale", "Touch"),
	parameters: note(
		"Large size on the touch scale. Heading gaps grow about 1.25× with the spacing tokens.",
	),
}

export const Touch: Story = {
	play: choose("Scale", "Touch"),
	parameters: note(
		"Default size on the touch scale. Heading gaps grow with the spacing tokens; paragraphs stay 10px apart.",
	),
}
