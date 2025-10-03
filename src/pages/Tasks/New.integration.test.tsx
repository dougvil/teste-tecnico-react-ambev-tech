import { makeServer } from '@/mocks/mirage-server';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Response, type Server } from 'miragejs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TaskNew } from './New';

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('TaskNew - Integration Tests', () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    mockNavigate.mockClear();
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('Ref. Use Case 003 - Create new task flow', () => {
    it('should create a new task successfully with valid data and pending status', async () => {
      const user = userEvent.setup();
      render(<TaskNew />);

      const titleInput = screen.getByLabelText(/título/i);
      const descriptionInput = screen.getByLabelText(/descrição/i);
      const submitButton = screen.getByRole('button', { name: /adicionar/i });

      await user.type(titleInput, 'Nova tarefa de teste');
      await user.type(descriptionInput, 'Descrição detalhada da nova tarefa de teste');

      await user.click(submitButton);

      // Verify loading state - button should be disabled and show loading
      expect(screen.getByRole('button', { name: /adicionar/i })).toBeDisabled();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/tasks');
      });

      // Verify the task was created with PENDING status
      const tasks = server.db.tasks;
      const createdTask = tasks[tasks.length - 1];
      expect(createdTask.status).toBe('PENDING');
    });
  });

  describe('Edge Cases', () => {
    it('should display error message when task creation fails', async () => {
      server.post('/tasks', () => {
        return new Response(500, {}, { error: 'Erro ao criar tarefa' });
      });

      const user = userEvent.setup();
      render(<TaskNew />);

      const titleInput = screen.getByLabelText(/título/i);
      const descriptionInput = screen.getByLabelText(/descrição/i);
      const submitButton = screen.getByRole('button', { name: /adicionar/i });

      await user.type(titleInput, 'Nova tarefa de teste');
      await user.type(descriptionInput, 'Descrição detalhada da nova tarefa de teste');

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Erro ao criar tarefa. Por favor, tente novamente mais tarde.')).toBeInTheDocument();
      });

      // Should not navigate on error
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
