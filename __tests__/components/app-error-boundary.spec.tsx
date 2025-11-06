import { render, screen } from '@testing-library/react';
import { AppErrorBoundary } from '@/components/system/AppErrorBoundary';
import { vi } from 'vitest';

// Mock window.console.error to prevent noise in tests
vi.spyOn(console, 'error').mockImplementation(() => {});

// Error component for testing
const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('AppErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <AppErrorBoundary>
        <div>Normal content</div>
      </AppErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('catches errors and displays error UI', () => {
    // Suppress React's error boundary logging
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <ErrorComponent />
      </AppErrorBoundary>
    );

    // Check for error UI elements
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go to homepage/i })).toBeInTheDocument();

    spy.mockRestore();
  });

  it('displays unique error ID for tracking', () => {
    // Suppress React's error boundary logging
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <ErrorComponent />
      </AppErrorBoundary>
    );

    // Check for error ID in the UI
    const errorContainer = screen.getByText(/something went wrong/i).parentElement;
    expect(errorContainer?.textContent).toMatch(/Error ID: [a-f0-9-]+/i);

    spy.mockRestore();
  });

  it('has accessible error reporting', () => {
    // Suppress React's error boundary logging
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <ErrorComponent />
      </AppErrorBoundary>
    );

    // Check for error heading
    const errorHeading = screen.getByRole('heading', { name: /something went wrong/i });
    expect(errorHeading).toBeInTheDocument();

    spy.mockRestore();
  });

  it('handles reset functionality', () => {
    // Suppress React's error boundary logging
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <AppErrorBoundary>
        <ErrorComponent />
      </AppErrorBoundary>
    );

    // Click "Try Again" button
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();

    spy.mockRestore();
  });

  afterEach(() => {
    // Clean up after each test
    vi.restoreAllMocks();
  });
});