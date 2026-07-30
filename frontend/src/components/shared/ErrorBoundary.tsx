"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50/50 p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
          <p className="mt-2 text-sm text-slate-600">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-6"
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
