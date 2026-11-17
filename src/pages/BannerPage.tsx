import { useState } from "react"
import {
	Banner,
	type BannerLayout,
	type BannerTone,
} from "../components/Banner"
import { Button } from "../components/Button"
import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Prose } from "../components/Prose"
import { Text } from "../components/Text"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { Bell } from "../icons/Bell"
import { Panel } from "./Panel"

const tones: { tone: BannerTone; message: string; layout?: BannerLayout }[] = [
	{ tone: "neutral", message: "Maintenance is scheduled for Sunday." },
	{ tone: "info", message: "A new version is available." },
	{ tone: "success", message: "All changes are synced." },
	{ tone: "warning", message: "You’re approaching your storage limit." },
	{
		tone: "danger",
		message: "Sync is unavailable. Your changes are safe on this device.",
		layout: "stacked",
	},
]

export function BannerPage() {
	const [showUpdate, setShowUpdate] = useState(true)
	const [updated, setUpdated] = useState(false)
	const [connected, setConnected] = useState(false)

	return (
		<Prose style={{ paddingBottom: "32px" }}>
			<H2>Banner</H2>
			<P>
				Persistent messages that stay in the page flow. Use inline for a single
				sentence, even when it wraps. Always use stacked for multi-sentence
				messages or a title with supporting text. Icons match the first line
				height, including at the large platform scale.
			</P>

			<H3>Inline</H3>
			<Panel data-example="inline">
				<Flex column gap={8}>
					{showUpdate ? (
						<Banner
							tone={updated ? "success" : "info"}
							onDismiss={() => setShowUpdate(false)}
							dismissLabel="Dismiss update notice"
							actions={
								!updated && (
									<Button
										variant="quiet"
										variantColor="blue"
										onPress={() => setUpdated(true)}
									>
										Reload
									</Button>
								)
							}
						>
							{updated
								? "You’re on the latest version."
								: "A new version is available."}
						</Banner>
					) : (
						<Text size="sm" color="lowContrast">
							Update notice dismissed.
						</Text>
					)}
					<Button
						variant="quiet"
						onPress={() => {
							setShowUpdate(true)
							setUpdated(false)
						}}
					>
						Reset update example
					</Button>
				</Flex>
			</Panel>

			<H3>Stacked</H3>
			<Panel data-example="stacked">
				<Flex column gap={8}>
					<Banner
						layout="stacked"
						tone={connected ? "success" : "warning"}
						title={
							connected
								? "You’re connected."
								: "Your connection was interrupted."
						}
						actions={
							!connected && (
								<Button
									variant="quiet"
									variantColor="amber"
									onPress={() => setConnected(true)}
								>
									Reconnect
								</Button>
							)
						}
					>
						{connected
							? "All changes are synced."
							: "Changes are saved on this device. Reconnect to sync."}
					</Banner>
					<Button variant="quiet" onPress={() => setConnected(false)}>
						Reset connection example
					</Button>
				</Flex>
			</Panel>

			<H3>Tones</H3>
			<Panel data-example="tones">
				<Flex column gap={6}>
					{tones.map(({ tone, message, layout }) => (
						<Banner key={tone} tone={tone} layout={layout}>
							{message}
						</Banner>
					))}
				</Flex>
			</Panel>

			<H3>Narrow layouts</H3>
			<P>
				Messages wrap without truncation, with stacked actions on the right.
			</P>
			<Panel data-example="narrow">
				<Flex column gap={6} style={{ maxWidth: "320px" }}>
					<Banner
						layout="stacked"
						tone="info"
						actions={
							<Button
								variant="quiet"
								variantColor="blue"
								onPress={() => setUpdated(true)}
							>
								{updated ? "Up to date" : "Reload"}
							</Button>
						}
					>
						A new version is available. Reload to get the latest improvements.
					</Banner>
					<Banner
						layout="stacked"
						tone="warning"
						title="Your connection was interrupted."
						actions={
							<Button
								variant="quiet"
								variantColor="amber"
								onPress={() => setConnected(true)}
							>
								{connected ? "Connected" : "Reconnect"}
							</Button>
						}
					>
						Changes are saved on this device. Reconnect to sync.
					</Banner>
				</Flex>
			</Panel>

			<H3>Custom icon and no icon</H3>
			<Panel data-example="icons">
				<Flex column gap={6}>
					<Banner icon={<Bell />}>
						Notifications are paused until tomorrow.
					</Banner>
					<Banner icon={false}>Maintenance is scheduled for Sunday.</Banner>
				</Flex>
			</Panel>

			<H3>Usage</H3>
			<CodeBlock lang="tsx">{`<Banner
  tone="info"
  layout="inline"
  actions={<Button variant="quiet" variantColor="blue" onPress={reload}>Reload</Button>}
  onDismiss={() => setVisible(false)}
>
  A new version is available.
</Banner>

<Banner
  tone="warning"
  layout="stacked"
  title="Your connection was interrupted."
  actions={<Button variant="quiet" variantColor="amber" onPress={reconnect}>Reconnect</Button>}
>
  Changes are saved on this device. Reconnect to sync.
</Banner>`}</CodeBlock>
			<P>
				Neutral tone and inline layout are the defaults. Actions accept composed
				buttons or links; use quiet buttons with a matching palette: gray for
				neutral, blue for info, green for success, amber for warning, and red
				for danger. Stacked and wrapped actions align to the right. The caller
				controls visibility through <Code>onDismiss</Code>; there is no timer or
				automatic dismissal. Customize the close button’s accessible name with{" "}
				<Code>dismissLabel</Code>.
			</P>
			<P>
				Banners do not announce themselves by default. Use{" "}
				<Code>role="status"</Code> for live updates or <Code>role="alert"</Code>{" "}
				for urgent failures. Tone alone does not determine urgency. Style parts
				are available through <Code>bannerStyles</Code>.
			</P>
		</Prose>
	)
}
