import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Application error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-void flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-text-secondary mb-4">Error</p>
            <h1 className="font-display text-3xl text-text-primary mb-4">Something went wrong</h1>
            <p className="text-sm text-text-secondary mb-8">
              Please refresh the page or return to the collection.
            </p>
            <a
              href="/shop"
              className="inline-flex h-10 px-6 border border-stroke items-center justify-center text-xs tracking-[0.2em] uppercase text-text-primary hover:border-gold hover:text-gold transition-colors duration-500"
            >
              Collection
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
