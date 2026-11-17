import { useEffect, useRef, useState } from "react"
import type { Editor as TiptapEditor } from "@tiptap/react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Drawer } from "../components/Drawer"
import { MarkdownEditor } from "../components/MarkdownEditor"
import { Text } from "../components/Text"
import { Flex, Spacer } from "../components/Utils"
import {
	Menu,
	Plus,
	Close,
	Paperclip,
	ArrowUp,
	FileText,
	Folder,
	Check,
} from "../icons"
import { backgroundColor } from "../tokens/background"
import { borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { shadow } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"

type Message = { role: "user" | "assistant"; text: string; files?: string[] }
type Session = { id: number; title: string; messages: Message[] }

const initialSessions: Session[] = [
	{
		id: 1,
		title: "Workspace overview",
		messages: [
			{
				role: "user",
				text: "Give me a quick overview of this workspace.",
				files: ["README.md"],
			},
			{
				role: "assistant",
				text: "Here’s how your Halo workspace is organized.\n\nSessions keep your conversations and ongoing work together.\n\nDocuments hold the files you can open, edit, and share with Halo.\n\nExtensions add capabilities, with routines for scheduled work.\n\nOpen the sidebar to explore, or tell me what you’d like to work on next.",
			},
		],
	},
]

const documents: Record<string, string> = {
	"README.md":
		"# My workspace\n\nA place for conversations, documents, and work with Halo.\n\n## Getting started\n\nOpen a session to start a conversation. Attach a document to give Halo more context.\n\nThis is a local prototype with sample data, not a connected Halo workspace.",
	"notes.md":
		"# Notes\n\n- Explore the workspace\n- Review documents\n- Start a new session\n\nThese are sample notes for the mobile prototype.",
}

/** Standalone, local-only prototype of Halo's mobile workspace. */
export function HaloPage() {
	const [navOpen, setNavOpen] = useState(false)
	const [sessions, setSessions] = useState(initialSessions)
	const [activeId, setActiveId] = useState(1)
	const [documentName, setDocumentName] = useState<string | null>(null)
	const [draft, setDraft] = useState("")
	const composerRef = useRef<TiptapEditor | null>(null)
	const [files, setFiles] = useState<string[]>([])
	const fileInput = useRef<HTMLInputElement>(null)
	const feed = useRef<HTMLDivElement>(null)
	const scrollToReply = useRef(false)
	const nextId = useRef(2)
	const shell = useStyles(shellStyle)
	const header = useStyles(headerStyle)
	const column = useStyles(columnStyle)
	const bubble = useStyles(bubbleStyle)
	const navItem = useStyles(navItemStyle)
	const composer = useStyles(composerStyle)
	const active = sessions.find((session) => session.id === activeId)!
	const title = documentName ?? active.title

	useEffect(() => {
		if (feed.current) {
			feed.current.scrollTop = scrollToReply.current
				? feed.current.scrollHeight
				: 0
		}
		scrollToReply.current = false
	}, [active.messages.length, activeId, documentName])

	function clearDraft() {
		composerRef.current?.commands.clearContent(false)
		setDraft("")
	}

	function newSession() {
		const id = nextId.current++
		setSessions((current) => [
			...current,
			{ id, title: "New session", messages: [] },
		])
		setActiveId(id)
		setDocumentName(null)
		clearDraft()
		setFiles([])
		setNavOpen(false)
	}

	function send() {
		if (!draft.trim() && !files.length) return
		scrollToReply.current = true
		setSessions((current) =>
			current.map((session) =>
				session.id !== activeId
					? session
					: {
							...session,
							title: session.messages.length
								? session.title
								: draft.trim().slice(0, 32) || "Attached documents",
							messages: [
								...session.messages,
								{ role: "user", text: draft.trim(), files },
								{
									role: "assistant",
									text: "Your message is added to this demo session. In Halo, this is where the agent would respond and work with your documents. This prototype runs locally—no message or attachment has been uploaded.",
								},
							],
						},
			),
		)
		clearDraft()
		setFiles([])
	}

	function closeSession() {
		if (documentName) {
			setDocumentName(null)
			return
		}
		const remaining = sessions.filter((session) => session.id !== activeId)
		if (remaining.length) {
			setSessions(remaining)
			setActiveId(remaining[remaining.length - 1]!.id)
			clearDraft()
			setFiles([])
		} else {
			setSessions([{ id: activeId, title: "New session", messages: [] }])
			clearDraft()
			setFiles([])
		}
	}

	return (
		<main className={shell} aria-label="Halo prototype">
			<header className={header}>
				<Button
					variant="quiet"
					aria-label="Open sidebar"
					onPress={() => setNavOpen(true)}
				>
					<Menu />
				</Button>
				<Flex
					row
					alignItems="center"
					gap={2}
					background="app"
					radius="sm"
					style={{
						minWidth: 0,
						flex: 1,
						maxWidth: 320,
						paddingLeft: spacing.value(3),
					}}
				>
					<Text
						size="sm"
						fontWeight={500}
						style={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							flex: 1,
						}}
					>
						{title}
					</Text>
					<Button
						variant="quiet"
						aria-label={`Close ${title}`}
						onPress={closeSession}
					>
						<Close size="xs" />
					</Button>
				</Flex>
				<Button variant="quiet" aria-label="New session" onPress={newSession}>
					<Plus />
				</Button>
			</header>

			<Drawer
				isOpen={navOpen}
				onOpenChange={setNavOpen}
				aria-label="Workspace navigation"
			>
				<Flex
					column
					gap={8}
					p={6}
					style={{
						height: "100%",
						paddingTop: "max(16px, env(safe-area-inset-top))",
					}}
				>
					<Flex row alignItems="center" justifyContent="between">
						<Text fontWeight={600}>Halo</Text>
						<Button
							variant="quiet"
							aria-label="Close sidebar"
							onPress={() => setNavOpen(false)}
						>
							<Close />
						</Button>
					</Flex>
					<Flex column gap={8} style={{ overflowY: "auto", flex: 1 }}>
						<Flex column gap={3}>
							<Text size="xs" color="lowContrast" fontWeight={500}>
								Extensions
							</Text>
							<Text size="sm" color="lowContrast">
								No extensions installed.
							</Text>
						</Flex>
						<Flex column gap={2}>
							<Text size="xs" color="lowContrast" fontWeight={500}>
								Documents
							</Text>
							<Flex row gap={2} alignItems="center" py={2}>
								<Folder size="sm" />
								<Text size="sm">Workspace</Text>
							</Flex>
							{Object.keys(documents).map((name) => (
								<button
									key={name}
									className={navItem}
									onClick={() => {
										setDocumentName(name)
										setNavOpen(false)
									}}
								>
									<FileText size="sm" />
									{name}
								</button>
							))}
						</Flex>
						<Flex column gap={2}>
							<Flex row alignItems="center" justifyContent="between">
								<Text size="xs" color="lowContrast" fontWeight={500}>
									Sessions
								</Text>
								<Button
									variant="quiet"
									aria-label="Create session"
									onPress={newSession}
								>
									<Plus size="xs" />
								</Button>
							</Flex>
							{sessions.map((session) => (
								<button
									key={session.id}
									className={navItem}
									aria-current={
										!documentName && activeId === session.id
											? "page"
											: undefined
									}
									onClick={() => {
										setActiveId(session.id)
										setDocumentName(null)
										clearDraft()
										setFiles([])
										setNavOpen(false)
									}}
								>
									<span style={{ flex: 1 }}>{session.title}</span>
									{activeId === session.id && <Check size="xs" />}
								</button>
							))}
						</Flex>
					</Flex>
					<Flex column gap={2}>
						<Text size="xs" color="lowContrast">
							Halo · Mobile prototype
						</Text>
						<Text size="xs" color="lowContrast">
							Sample data · No server connection
						</Text>
					</Flex>
				</Flex>
			</Drawer>

			{documentName ? (
				<div className={column} style={{ overflowY: "auto", paddingBlock: 24 }}>
					<MarkdownEditor
						key={documentName}
						initialContent={documents[documentName]}
						editable={false}
						aria-label={documentName}
					/>
				</div>
			) : (
				<>
					<div
						ref={feed}
						role="log"
						aria-label="Conversation"
						className={column}
						style={{
							flex: 1,
							minHeight: 0,
							overflowY: "auto",
							paddingBlock: 24,
						}}
					>
						<Flex column gap={12}>
							{active.messages.map((message, index) => (
								<div
									key={index}
									className={message.role === "user" ? bubble : undefined}
								>
									<Text
										size="md"
										style={{
											whiteSpace: "pre-wrap",
											overflowWrap: "anywhere",
											display: "block",
										}}
									>
										{message.text}
									</Text>
									{message.files?.map((name, i) => (
										<Flex key={i} row gap={2} alignItems="center" pt={3}>
											<FileText size="xs" />
											<Text
												size="xs"
												color="lowContrast"
												style={{ overflowWrap: "anywhere" }}
											>
												{name}
											</Text>
										</Flex>
									))}
								</div>
							))}
						</Flex>
					</div>
					<div
						className={column}
						style={{
							paddingTop: 8,
							paddingBottom: "max(16px, env(safe-area-inset-bottom))",
							flexShrink: 0,
						}}
					>
						<div className={composer}>
							{files.map((name, index) => (
								<Flex key={index} row gap={2} alignItems="center">
									<FileText size="xs" />
									<Text size="xs" style={{ flex: 1, overflowWrap: "anywhere" }}>
										{name}
									</Text>
									<Button
										variant="quiet"
										aria-label={`Remove ${name}`}
										onPress={() =>
											setFiles((current) =>
												current.filter((_, i) => i !== index),
											)
										}
									>
										<Close size="xs" />
									</Button>
								</Flex>
							))}
							<div
								style={{ maxHeight: "25dvh", overflowY: "auto", minHeight: 52 }}
							>
								<MarkdownEditor
									ref={composerRef}
									initialContent={draft}
									onChange={setDraft}
									onSubmit={send}
									placeholder="Message Halo"
									aria-label="Message Halo"
								/>
							</div>
							<Flex row alignItems="center">
								<input
									ref={fileInput}
									type="file"
									multiple
									hidden
									onChange={(event) => {
										setFiles((current) => [
											...current,
											...Array.from(
												event.target.files ?? [],
												(file) => file.name,
											),
										])
										event.target.value = ""
									}}
								/>
								<Button
									variant="quiet"
									aria-label="Add attachments"
									onPress={() => fileInput.current?.click()}
								>
									<Paperclip />
								</Button>
								<Spacer />
								<Button
									variant="quiet"
									aria-label="Send message"
									isDisabled={!draft.trim() && !files.length}
									onPress={send}
									style={{ borderRadius: "50%", background: colors.gray[3] }}
								>
									<ArrowUp />
								</Button>
							</Flex>
						</div>
						<Text
							size="2xs"
							color="lowContrast"
							style={{ display: "block", textAlign: "center", marginTop: 8 }}
						>
							Local prototype · Messages aren’t sent to a server
						</Text>
					</div>
				</>
			)}
		</main>
	)
}

const shellStyle = style({
	display: "flex",
	flexDirection: "column",
	height: "100dvh",
	background: backgroundColor.app,
	overflow: "hidden",
})
const headerStyle = style({
	display: "flex",
	alignItems: "center",
	gap: spacing.value(2),
	padding: "max(4px, env(safe-area-inset-top)) 8px 4px",
	background: backgroundColor.element,
	borderBottom: `1px solid ${borderColor.outline}`,
	flexShrink: 0,
})
const columnStyle = style({
	width: "100%",
	maxWidth: "72ch",
	marginInline: "auto",
	paddingInline: 16,
})
const bubbleStyle = style({
	alignSelf: "flex-end",
	maxWidth: "85%",
	padding: spacing.value(4),
	background: colors.gray[3],
	borderRadius: 12,
})
const composerStyle = style(shadow.subtle, {
	background: backgroundColor.element,
	borderRadius: 16,
	padding: "12px 16px",
})
const navItemStyle = style(focusRing(), {
	display: "flex",
	alignItems: "center",
	gap: spacing.value(3),
	minHeight: 44,
	width: "100%",
	padding: "8px",
	border: "none",
	borderRadius: 4,
	color: colors.gray[12],
	background: "transparent",
	textAlign: "left",
	overflowWrap: "anywhere",
	"&:hover": {
		background: backgroundColor.elementHover,
	},
	"&[aria-current='page']": {
		background: backgroundColor.elementHover,
		color: colors.accent[11],
	},
})
