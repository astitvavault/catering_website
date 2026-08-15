import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
	children: ReactNode;
	captureGlobalErrors?: boolean;
};

type State = {
	error: Error | null;
};

/**
 * Lightweight replacement for the GoDaddy Airo error boundary.
 * Keeps the app from white-screening on render errors in development.
 */
export default class AppErrorBoundary extends Component<Props, State> {
	state: State = { error: null };

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("[AppErrorBoundary]", error, info.componentStack);
	}

	componentDidMount() {
		if (this.props.captureGlobalErrors === false) return;
		if (typeof window === "undefined") return;

		window.addEventListener("error", this.onWindowError);
		window.addEventListener("unhandledrejection", this.onUnhandledRejection);
	}

	componentWillUnmount() {
		if (typeof window === "undefined") return;
		window.removeEventListener("error", this.onWindowError);
		window.removeEventListener("unhandledrejection", this.onUnhandledRejection);
	}

	private onWindowError = (event: ErrorEvent) => {
		console.error("[AppErrorBoundary] window error", event.error ?? event.message);
	};

	private onUnhandledRejection = (event: PromiseRejectionEvent) => {
		console.error("[AppErrorBoundary] unhandled rejection", event.reason);
	};

	render() {
		if (this.state.error) {
			return (
				<div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
					<h1>Something went wrong</h1>
					<pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error.message}</pre>
					<button type="button" onClick={() => this.setState({ error: null })}>
						Try again
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}
