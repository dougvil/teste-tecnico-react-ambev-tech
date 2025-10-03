import { makeServer } from '@/mocks/mirage-server';
import { mockTasks } from '@/test/mocks/tasks.mock';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Response, type Server } from 'miragejs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TaskEdit } from './Edit';

// Mock useNavigate and useParams from react-router-dom
const mockNavigate = vi.fn();
const mockParams = { taskId: '1' };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockParams,
  };
});

describe('TaskEdit - Integration Tests', () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    server.db.loadData({
      tasks: mockTasks,
    });
    mockNavigate.mockClear();
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('Ref. Use Case 004 - Edit task flow', () => {
    it('should load and display existing task data in form fields', async () => {
      render(<TaskEdit />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByText('Editar Tarefa')).toBeInTheDocument();
      });

      const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement;
      const descriptionInput = screen.getByLabelText(/descrição/i) as HTMLInputElement;

      expect(titleInput.value).toBe('Revisar documentação da API');
      expect(descriptionInput.value).toBe(
        'Atualizar a documentação da API REST com os novos endpoints implementados e exemplos de uso',
      );
    });

    it('should update task successfully with modified data', async () => {
      const user = userEvent.setup();
      render(<TaskEdit />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Editar Tarefa')).toBeInTheDocument();
      });

      const titleInput = screen.getByLabelText(/título/i);
      const descriptionInput = screen.getByLabelText(/descrição/i);
      const submitButton = screen.getByRole('button', { name: /salvar alterações/i });

      // Clear and update fields
      await user.clear(titleInput);
      await user.type(titleInput, 'Título atualizado');

      await user.clear(descriptionInput);
      await user.type(descriptionInput, 'Descrição atualizada');

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/tasks');
      });

      // Verify the task was updated
      const task = server.db.tasks.find('1');
      expect(task.title).toBe('Título atualizado');
      expect(task.description).toBe('Descrição atualizada');
    });

    it('should update task status from pending to completed', async () => {
      const user = userEvent.setup();
      render(<TaskEdit />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Editar Tarefa')).toBeInTheDocument();
      });

      // Open status dropdown
      const statusSelect = screen.getByLabelText(/status/i);
      await user.click(statusSelect);

      // Select "Concluída"
      const completedOption = await screen.findByRole('option', { name: /concluída/i });
      await user.click(completedOption);

      const submitButton = screen.getByRole('button', { name: /salvar alterações/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/tasks');
      });

      // Verify status was updated
      const task = server.db.tasks.find('1');
      expect(task.status).toBe('COMPLETED');
    });
  });

  describe('Edge Cases', () => {
    it('should display error message when task fetch fails', async () => {
      server.get('/tasks/:id', () => {
        return new Response(500, {}, { error: 'Erro ao buscar tarefa' });
      });

      render(<TaskEdit />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Erro ao carregar tarefa. Por favor, tente novamente mais tarde.')).toBeInTheDocument();
      });

      // Form should not be displayed
      expect(screen.queryByLabelText(/título/i)).not.toBeInTheDocument();
    });

    it('should display error message when task update fails', async () => {
      server.patch('/tasks/:id', () => {
        return new Response(500, {}, { error: 'Erro ao atualizar tarefa' });
      });

      const user = userEvent.setup();
      render(<TaskEdit />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Editar Tarefa')).toBeInTheDocument();
      });

      const titleInput = screen.getByLabelText(/título/i);
      const submitButton = screen.getByRole('button', { name: /salvar alterações/i });

      await user.clear(titleInput);
      await user.type(titleInput, 'Título modificado');

      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Erro ao atualizar tarefa. Por favor, tente novamente mais tarde.'),
        ).toBeInTheDocument();
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should load and edit a different task when taskId changes', async () => {
      // Change the mocked params to use a different task
      mockParams.taskId = '2';

      render(<TaskEdit />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Editar Tarefa')).toBeInTheDocument();
      });

      const titleInput = screen.getByLabelText(/título/i) as HTMLInputElement;
      const descriptionInput = screen.getByLabelText(/descrição/i) as HTMLInputElement;

      expect(titleInput.value).toBe(mockTasks[1].title);
      expect(descriptionInput.value).toBe(mockTasks[1].description);

      // Reset back to task 1 for other tests
      mockParams.taskId = '1';
    });
  });
});
