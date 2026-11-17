/** Product-doc preview page: renders gallery stories for `preview` and `flow` blocks. */
import { setProjectAnnotations } from "@storybook/react"
import { PreviewRoute } from "product-doc/preview"
import { createRoot } from "react-dom/client"
import { MauiProvider } from "./MauiProvider"

setProjectAnnotations([
	{
		decorators: [
			(Story) => (
				<MauiProvider>
					<Story />
				</MauiProvider>
			),
		],
	},
])

const stories = import.meta.glob("./**/*.stories.tsx", { eager: true })

createRoot(document.getElementById("root")!).render(
	<PreviewRoute stories={stories} />,
)
