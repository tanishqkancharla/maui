import React, { useEffect, useRef, type ReactNode } from "react"
import { createRoot, type Root } from "react-dom/client"
import {
	beginPreviewErrorGuard,
	dismissDevOverlays,
	endPreviewErrorGuardSoon,
	toPreviewError,
} from "./previewOverlay"

type PreviewErrorBoundaryProps = {
	resetKey: string
	fallback: React.ReactNode
	onError: (error: Error | null) => void
	onReady: () => void
	children: React.ReactNode
}

type PreviewErrorBoundaryState = {
	error: Error | null
}

class PreviewErrorBoundary extends React.Component<
	PreviewErrorBoundaryProps,
	PreviewErrorBoundaryState
> {
	state: PreviewErrorBoundaryState = { error: null }

	static getDerivedStateFromError(error: Error): PreviewErrorBoundaryState {
		return { error }
	}

	componentDidCatch(error: Error) {
		this.props.onError(error)
	}

	componentDidMount() {
		if (!this.state.error) {
			this.props.onReady()
		}
	}

	componentDidUpdate(prevProps: PreviewErrorBoundaryProps) {
		if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
			this.setState({ error: null })
			this.props.onError(null)
			return
		}

		if (!this.state.error) {
			this.props.onReady()
		}
	}

	render() {
		if (this.state.error) {
			return this.props.fallback
		}

		return this.props.children
	}
}

export function PreviewIsland(props: {
	className?: string
	resetKey: string
	fallback: React.ReactNode
	onError: (error: Error | null) => void
	onReady: () => void
	Providers: (props: { children?: ReactNode }) => ReactNode
	children: React.ReactNode
}) {
	const hostRef = useRef<HTMLDivElement>(null)
	const rootRef = useRef<Root | null>(null)
	const recoveringRef = useRef(false)
	const latestRef = useRef(props)
	latestRef.current = props

	useEffect(() => {
		const host = hostRef.current
		if (!host) return
		const mountNode = host

		function renderNode(node: React.ReactNode) {
			const root = rootRef.current
			const latest = latestRef.current
			if (!root) return
			const Providers = latest.Providers
			beginPreviewErrorGuard()
			root.render(
				<Providers>
					<PreviewErrorBoundary
						resetKey={latest.resetKey}
						fallback={latest.fallback}
						onError={latest.onError}
						onReady={latest.onReady}
					>
						{node}
					</PreviewErrorBoundary>
				</Providers>,
			)
			endPreviewErrorGuardSoon()
		}

		function remount() {
			if (!mountNode.isConnected) return
			try {
				rootRef.current?.unmount()
			} catch {
				// The previous root may already be dead after an uncaught host error.
			}
			rootRef.current = createRoot(mountNode, {
				onUncaughtError(error) {
					latestRef.current.onError(toPreviewError(error))
					dismissDevOverlays()
					if (recoveringRef.current) return
					recoveringRef.current = true
					requestAnimationFrame(() => {
						remount()
						renderNode(latestRef.current.fallback)
						recoveringRef.current = false
					})
				},
				onCaughtError(error) {
					latestRef.current.onError(toPreviewError(error))
					dismissDevOverlays()
				},
				onRecoverableError() {
					dismissDevOverlays()
				},
			})
		}

		remount()
		renderNode(latestRef.current.children)

		return () => {
			try {
				rootRef.current?.unmount()
			} catch {
				// Ignore unmount races during HMR / recovery.
			}
			rootRef.current = null
		}
	}, [])

	useEffect(() => {
		const root = rootRef.current
		if (!root) return
		const Providers = props.Providers
		beginPreviewErrorGuard()
		root.render(
			<Providers>
				<PreviewErrorBoundary
					resetKey={props.resetKey}
					fallback={props.fallback}
					onError={props.onError}
					onReady={props.onReady}
				>
					{props.children}
				</PreviewErrorBoundary>
			</Providers>,
		)
		endPreviewErrorGuardSoon()
	}, [
		props.Providers,
		props.children,
		props.fallback,
		props.onError,
		props.onReady,
		props.resetKey,
	])

	return <div ref={hostRef} className={props.className} />
}
