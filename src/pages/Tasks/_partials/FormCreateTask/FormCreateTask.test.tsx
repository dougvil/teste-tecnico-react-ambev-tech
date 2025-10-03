import { renderWithProviders as render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FormCreateTask } from './FormCreateTask';

describe('FormCreateTask', () => {
  const mockOnSuccess = vi.fn();
  const mockOnCancel = vi.fn();
  const mockOnError = vi.fn();

  const defaultProps = {
    onSuccess: mockOnSuccess,
    onCancel: mockOnCancel,
    onError: mockOnError,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form fields empty for new task', () => {
    render(<FormCreateTask {...defaultProps} />);

    const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/descrição/i) as HTMLTextAreaElement;

    expect(titleInput).toBeInTheDocument();
    expect(titleInput.value).toBe('');
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput.value).toBe('');
  });

  it('should render submit and cancel buttons with correct labels', () => {
    render(<FormCreateTask {...defaultProps} />);

    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('should show error when title is empty', async () => {
    const user = userEvent.setup();
    render(<FormCreateTask {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /adicionar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Título é obrigatório')).toBeInTheDocument();
    });
  });

  it('should show error when description is empty', async () => {
    const user = userEvent.setup();
    render(<FormCreateTask {...defaultProps} />);

    const titleInput = screen.getByLabelText(/título/i);
    await user.type(titleInput, 'Título válido');

    const submitButton = screen.getByRole('button', { name: /adicionar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Descrição é obrigatória')).toBeInTheDocument();
    });
  });

  it('should render description as multiline textarea', () => {
    render(<FormCreateTask {...defaultProps} />);

    const descriptionInput = screen.getByLabelText(/descrição/i);
    expect(descriptionInput.tagName).toBe('TEXTAREA');
    expect(descriptionInput).toHaveAttribute('rows', '6');
  });

  it('should not have status field for new task', () => {
    render(<FormCreateTask {...defaultProps} />);

    const statusSelect = screen.queryByLabelText(/status/i);
    expect(statusSelect).not.toBeInTheDocument();
  });

  it('should not submit form with invalid data', async () => {
    const user = userEvent.setup();
    render(<FormCreateTask {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /adicionar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Título é obrigatório')).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should call onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<FormCreateTask {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should allow editing all fields', async () => {
    const user = userEvent.setup();
    render(<FormCreateTask {...defaultProps} />);

    const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/descrição/i) as HTMLTextAreaElement;

    await user.type(titleInput, 'Nova Tarefa');
    await user.type(descriptionInput, 'Descrição da nova tarefa');

    expect(titleInput.value).toBe('Nova Tarefa');
    expect(descriptionInput.value).toBe('Descrição da nova tarefa');
  });

  it('should have title field with autofocus', () => {
    render(<FormCreateTask {...defaultProps} />);

    const titleInput = screen.getByLabelText(/título/i);
    expect(titleInput).toHaveProperty('autofocus');
  });
});
