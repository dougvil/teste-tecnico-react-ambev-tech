import { renderWithProviders as render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SnackbarAlert } from './SnackbarAlert';

describe('SnackbarAlert', () => {
  const mockOnClose = vi.fn();

  const defaultProps = {
    open: true,
    message: 'Test message',
    onClose: mockOnClose,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render snackbar with message when open is true', () => {
    render(<SnackbarAlert {...defaultProps} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should not render snackbar when open is false', () => {
    render(
      <SnackbarAlert
        {...defaultProps}
        open={false}
      />,
    );

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('should render with success severity', () => {
    render(
      <SnackbarAlert
        {...defaultProps}
        severity='success'
      />,
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-filledSuccess');
  });

  it('should render with error severity', () => {
    render(
      <SnackbarAlert
        {...defaultProps}
        severity='error'
      />,
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-filledError');
  });

  it('should render with warning severity', () => {
    render(
      <SnackbarAlert
        {...defaultProps}
        severity='warning'
      />,
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-filledWarning');
  });

  it('should render with info severity by default', () => {
    render(<SnackbarAlert {...defaultProps} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-filledInfo');
  });

  it('should call onClose when auto hide duration expires', async () => {
    render(
      <SnackbarAlert
        {...defaultProps}
        autoHideDuration={100}
      />,
    );

    await waitFor(
      () => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 200 },
    );
  });

  it('should call onClose when clicking outside', async () => {
    const user = userEvent.setup();
    render(<SnackbarAlert {...defaultProps} />);

    const backdrop = document.body;
    await user.click(backdrop);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should render at bottom center by default', () => {
    const { container } = render(<SnackbarAlert {...defaultProps} />);

    const snackbar = container.querySelector('.MuiSnackbar-root');
    expect(snackbar).toHaveClass('MuiSnackbar-anchorOriginBottomCenter');
  });

  it('should render at custom anchor position', () => {
    const { container } = render(
      <SnackbarAlert
        {...defaultProps}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />,
    );

    const snackbar = container.querySelector('.MuiSnackbar-root');
    expect(snackbar).toHaveClass('MuiSnackbar-anchorOriginTopRight');
  });

  it('should display different messages', () => {
    const { rerender } = render(
      <SnackbarAlert
        {...defaultProps}
        message='First message'
      />,
    );

    expect(screen.getByText('First message')).toBeInTheDocument();

    rerender(
      <SnackbarAlert
        {...defaultProps}
        message='Second message'
      />,
    );

    expect(screen.getByText('Second message')).toBeInTheDocument();
    expect(screen.queryByText('First message')).not.toBeInTheDocument();
  });

  it('should use custom autoHideDuration', async () => {
    render(
      <SnackbarAlert
        {...defaultProps}
        autoHideDuration={50}
      />,
    );

    await waitFor(
      () => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 100 },
    );
  });
});
