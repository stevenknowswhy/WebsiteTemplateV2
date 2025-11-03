import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';

// Mock the useTheme hook
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    // Clear all mock calls before each test
    jest.clearAllMocks();

    // Mock the useTheme hook to return controlled values
    (useTheme as jest.Mock).mockReturnValue({
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
    (useTheme as jest.Mock).mockReturnValue({
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
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    // Check if the sun icon is visible (dark mode shows sun icon)
    const button = screen.getByLabelText('Toggle theme');
    expect(button).toContainElement(screen.getByRole('img', { hidden: true }));
  });
});