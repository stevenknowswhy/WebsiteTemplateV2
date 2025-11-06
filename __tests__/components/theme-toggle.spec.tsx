import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import { vi } from 'vitest';

// Mock the useTheme hook
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    // Clear all mock calls before each test
    vi.clearAllMocks();

    // Mock the useTheme hook to return controlled values
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });
  });

  it('renders theme toggle button', () => {
    render(<ThemeToggle />);

    const button = screen.getByLabelText('Toggle theme');
    expect(button).toBeInTheDocument();
  });

  it('calls setTheme with "dark" when current theme is "light"', () => {
    render(<ThemeToggle />);

    const button = screen.getByLabelText('Toggle theme');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('calls setTheme with "light" when current theme is "dark"', () => {
    // Change the mock to return dark theme
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByLabelText('Toggle theme');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('shows sun icon in dark mode', () => {
    // Change the mock to return dark theme
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    // Check if the sun icon is visible (dark mode shows sun icon)
    const button = screen.getByLabelText('Toggle theme');
    // Look for the sun icon by checking the SVG class name
    const sunIcon = button.querySelector('svg.lucide-sun');
    expect(sunIcon).toBeInTheDocument();
  });
});