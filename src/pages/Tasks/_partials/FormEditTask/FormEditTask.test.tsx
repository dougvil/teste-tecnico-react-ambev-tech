import { mockTasks } from '@/test/mocks/tasks.mock';
import { renderWithProviders as render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FormEditTask } from './FormEditTask';

describe('FormEditTask', () => {
  const mockTask = mockTasks[0];
  const mockOnSuccess = vi.fn();
  const mockOnCancel = vi.fn();
  const mockOnError = vi.fn();

  const defaultProps = {
    task: mockTask,
    onSuccess: mockOnSuccess,
    onCancel: mockOnCancel,
    onError: mockOnError,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form fields with task data', () => {
    render(<FormEditTask {...defaultProps} />);

    const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/descrição/i) as HTMLInputElement;
    const statusSelect = screen.getByLabelText(/status/i);

    expect(titleInput).toBeInTheDocument();
    expect(titleInput.value).toBe(mockTask.title);
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput.value).toBe(mockTask.description);
    expect(statusSelect).toBeInTheDocument();
  });

  it('should render submit and cancel buttons', () => {
    render(<FormEditTask {...defaultProps} />);

    expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('should show error when title is empty', async () => {
    const user = userEvent.setup();
    render(<FormEditTask {...defaultProps} />);

    const titleInput = screen.getByLabelText(/título/i);
    await user.clear(titleInput);
    await user.tab();

    const submitButton = screen.getByRole('button', { name: /salvar alterações/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Título é obrigatório')).toBeInTheDocument();
    });
  });

  it('should show error when description is empty', async () => {
    const user = userEvent.setup();
    render(<FormEditTask {...defaultProps} />);

    const descriptionInput = screen.getByLabelText(/descrição/i);
    await user.clear(descriptionInput);
    await user.tab();

    const submitButton = screen.getByRole('button', { name: /salvar alterações/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Descrição é obrigatória')).toBeInTheDocument();
    });
  });

  it('should render description as multiline textarea', () => {
    render(<FormEditTask {...defaultProps} />);

    const descriptionInput = screen.getByLabelText(/descrição/i);
    expect(descriptionInput.tagName).toBe('TEXTAREA');
    expect(descriptionInput).toHaveAttribute('rows', '6');
  });

  it('should display status options', async () => {
    const user = userEvent.setup();
    render(<FormEditTask {...defaultProps} />);

    const statusSelect = screen.getByLabelText(/status/i);
    await user.click(statusSelect);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: /pendente/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /concluída/i })).toBeInTheDocument();
    });
  });

  it('should not submit form with invalid data', async () => {
    const user = userEvent.setup();
    render(<FormEditTask {...defaultProps} />);

    const titleInput = screen.getByLabelText(/título/i);
    await user.clear(titleInput);

    const submitButton = screen.getByRole('button', { name: /salvar alterações/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Título é obrigatório')).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should call onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<FormEditTask {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should allow editing all fields', async () => {
    const user = userEvent.setup();
    render(<FormEditTask {...defaultProps} />);

    const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/descrição/i) as HTMLTextAreaElement;

    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Title');

    await user.clear(descriptionInput);
    await user.type(descriptionInput, 'Updated Description');

    expect(titleInput.value).toBe('Updated Title');
    expect(descriptionInput.value).toBe('Updated Description');
  });
});
