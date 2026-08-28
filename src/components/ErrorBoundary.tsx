import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReload = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="w-full my-6 p-6 rounded-2xl bg-white dark:bg-[#0d1e3a] border border-rose-200 dark:border-rose-900/50 shadow-xl text-center flex flex-col items-center justify-center max-w-xl mx-auto">
          <div className="p-3 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-full mb-3">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
            {this.props.fallbackTitle || "An unexpected error occurred while loading this view"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-md">
            {this.state.error?.message || "The application encountered a runtime issue. Click below to reset the view safely."}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReload}
              className="flex items-center gap-2 px-4 py-2 bg-[#003580] dark:bg-[#00d4ff] text-white dark:text-[#0f1f3d] rounded-lg text-xs font-bold shadow hover:opacity-90 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry View</span>
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold hover:bg-slate-200 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Reload App</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
