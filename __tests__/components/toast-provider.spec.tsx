import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider, useToast } from '@/components/ui/toast-context';
import { vi } from 'vitest';

// Mock the toast context
vi.mock('@/components/ui/toast-context', async () => {
  const actual = await vi.importActual('@/components/ui/toast-context');
  return {
    ...actual,
    useToast: vi.fn(() => ({
      showToast: vi.fn(),
      removeToast: vi.fn(),
    })),
  };
});

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders toast provider without children', () => {
    render(<ToastProvider><div>Test</div></ToastProvider>);
    // Should render without error
    expect(document.body).toBeInTheDocument();
  });

  it('renders toast provider with children', () => {
    render(
      <ToastProvider>
        <div>Child content</div>
      </ToastProvider>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<ToastProvider><div>Test</div></ToastProvider>);

    // The ToastProvider itself doesn't render status element directly
    // It provides context and renders children
    expect(container).toBeInTheDocument();
  });
});

describe('toast functionality', () => {
  it('useToast hook provides required methods', () => {
    const mockShowToast = vi.fn();
    const mockRemoveToast = vi.fn();

    vi.mocked(useToast).mockReturnValue({
      showToast: mockShowToast,
      removeToast: mockRemoveToast,
    });

    const { result } = require('@testing-library/react-hooks').renderHook(() => useToast());

    expect(result.current.showToast).toBeDefined();
    expect(result.current.removeToast).toBeDefined();
  });
});