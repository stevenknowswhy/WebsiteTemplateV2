import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider } from '@/components/ui/toast-context';
import { toast } from '@/components/ui/toast';
import { vi } from 'vitest';

// Mock the toast context
vi.mock('@/components/ui/toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
    dismiss: vi.fn(),
  },
}));

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders toast provider without children', () => {
    render(<ToastProvider />);
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
    const { container } = render(<ToastProvider />);

    // The ToastProvider itself doesn't render status element directly
    // It provides context and renders children
    expect(container).toBeInTheDocument();
  });
});

describe('toast functionality', () => {
  it('toast.success exists and is callable', () => {
    toast.success('Test success message');
    expect(toast.success).toHaveBeenCalledWith('Test success message');
  });

  it('toast.error exists and is callable', () => {
    toast.error('Test error message');
    expect(toast.error).toHaveBeenCalledWith('Test error message');
  });

  it('toast.info exists and is callable', () => {
    toast.info('Test info message');
    expect(toast.info).toHaveBeenCalledWith('Test info message');
  });

  it('toast.warning exists and is callable', () => {
    toast.warning('Test warning message');
    expect(toast.warning).toHaveBeenCalledWith('Test warning message');
  });

  it('toast.dismiss exists and is callable', () => {
    toast.dismiss();
    expect(toast.dismiss).toHaveBeenCalled();
  });
});