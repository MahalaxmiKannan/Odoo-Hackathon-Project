import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // Also log to console for developer
    console.error('ErrorBoundary caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-[800px] mx-auto">
          <div className="rounded-xl bg-red-50 border border-red-200 p-6">
            <h2 className="text-xl font-semibold text-red-700">Something went wrong</h2>
            <p className="text-sm text-red-600 mt-2">An unexpected error occurred while rendering this page.</p>
            <details className="mt-4 text-xs text-gray-700 whitespace-pre-wrap">
              {String(this.state.error && this.state.error.toString())}
              {this.state.info?.componentStack && `\n\n${this.state.info.componentStack}`}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
