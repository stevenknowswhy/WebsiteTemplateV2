"use client";

import { Component, ReactNode } from "react";
import { XCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = Math.random().toString(36).substring(2, 9);
    console.error("AppErrorBoundary caught error:", error);
    console.error("Error ID:", errorId);
    return { hasError: true, error, errorId };
  }

  componentDidMount() {
    this.state.error && this.logError(this.state.error);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (!prevState.hasError && this.state.hasError && this.state.error) {
      this.logError(this.state.error);
    }
  }

  private logError = (error: Error) => {
    // Log error to monitoring service if configured
    if (typeof window !== "undefined" && (window as any).Sentry) {
      (window as any).Sentry.captureException(error);
    }
  };

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("AppErrorBoundary caught error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Component Stack:", errorInfo.componentStack);

    this.setState({ error });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We've encountered an unexpected error. Our team has been notified.
              {this.state.errorId && (
                <span className="block text-sm mt-2 font-mono">
                  Error ID: {this.state.errorId}
                </span>
              )}
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>

              <button
                onClick={() => window.location.href = "/"}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}