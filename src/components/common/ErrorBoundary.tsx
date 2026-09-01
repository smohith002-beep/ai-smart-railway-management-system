import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Railway App Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.href = '/';
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 select-none font-sans">
          <div className="max-w-xl w-full bg-[#0d0d0d] border border-neutral-800/80 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Ambient decorative glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">System Signal Interrupted</h1>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">AI Railway Runtime Exception Recovered</p>
              </div>
            </div>

            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              An unexpected condition occurred while processing live train operations. The recovery system has caught the event to safeguard telemetry feeds and user sessions.
            </p>

            {this.state.error && (
              <div className="p-3.5 bg-[#121212] border border-neutral-800 rounded-lg text-xs font-mono text-neutral-400 mb-6 max-h-32 overflow-y-auto">
                <p className="text-red-400 font-semibold mb-1">{this.state.error.name}: {this.state.error.message}</p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2.5 bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                Resume Session
              </button>
              <button
                onClick={this.handleReload}
                className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-neutral-700 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2 text-neutral-200"
              >
                <Home className="w-4 h-4" />
                Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
