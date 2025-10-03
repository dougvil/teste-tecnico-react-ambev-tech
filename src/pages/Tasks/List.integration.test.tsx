import { makeServer } from '@/mocks/mirage-server';
import { mockTasks } from '@/test/mocks/tasks.mock';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Response, type Server } from 'miragejs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TaskListPage } from './List';

describe('TaskList - Integration Tests', () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    server.db.loadData({
      tasks: mockTasks,
    });
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('Ref. Use Case 001 - List tasks flow', () => {
    it('should load and display the complete task information from the server', async () => {
      render(<TaskListPage />);

      await waitFor(() => {
        expect(screen.getByText('Revisar documentação da API')).toBeInTheDocument();
      });

      expect(screen.getByText('Implementar testes unitários')).toBeInTheDocument();
      expect(screen.getByText('Corrigir bug no formulário de login')).toBeInTheDocument();
      expect(screen.getByText(/Atualizar a documentação da API REST com os novos endpoints/i)).toBeInTheDocument();
      expect(screen.getByText(/Criar testes unitários para os componentes React/i)).toBeInTheDocument();
    });

    it('should display the correct status for each task', async () => {
      render(<TaskListPage />);

      await waitFor(() => {
        expect(screen.getByText('Revisar documentação da API')).toBeInTheDocument();
      });

      const pendingBadges = screen.getAllByText('Pendente');
      const completedBadges = screen.getAllByText('Concluída');

      expect(pendingBadges).toHaveLength(2);
      expect(completedBadges).toHaveLength(1);
    });

    it('should display a message when there are no tasks', async () => {
      server.db.emptyData();
      render(<TaskListPage />);

      await waitFor(() => {
        expect(screen.getByText('Nenhuma tarefa por aqui!')).toBeInTheDocument();
        expect(screen.getByText('Parabéns! Todas as suas tarefas foram concluídas.')).toBeInTheDocument();
      });
    });
  });

  describe('Ref. Use Case 002 - Complete task flow', () => {
    it('should mark task as completed', async () => {
      const user = userEvent.setup();

      // Simulate delay to capture loading state
      server.timing = 500;

      render(<TaskListPage />);

      await waitFor(() => {
        expect(screen.getByText('Revisar documentação da API')).toBeInTheDocument();
      });

      const completeButtons = screen.getAllByRole('button', { name: /marcar como concluída/i });
      await user.click(completeButtons[0]);

      // Verify loading state - MUI IconButton with loading prop displays a CircularProgress
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      // Wait for completion
      await waitFor(() => {
        const completedBadges = screen.getAllByText('Concluída');
        expect(completedBadges).toHaveLength(2);
        expect(screen.getByText('Tarefa concluída com sucesso!')).toBeInTheDocument();
      });

      // Verify loading state is gone
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('Ref. Use Case 005 - Delete task flow', () => {
    it('should delete task when confirming dialog box', async () => {
      const user = userEvent.setup();
      render(<TaskListPage />);

      await waitFor(() => {
        expect(screen.getByText('Revisar documentação da API')).toBeInTheDocument();
      });

      const initialDeleteButtons = screen.getAllByRole('button', { name: /excluir tarefa/i });
      const initialCount = initialDeleteButtons.length;

      await user.click(initialDeleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Excluir Tarefa')).toBeInTheDocument();
      });

      expect(screen.getByText(/Você tem certeza que deseja excluir esta tarefa/i)).toBeInTheDocument();

      const confirmButton = screen.getByRole('button', { name: /excluir/i });
      await user.click(confirmButton);

      await waitFor(
        () => {
          const remainingDeleteButtons = screen.getAllByRole('button', { name: /excluir tarefa/i });
          expect(remainingDeleteButtons).toHaveLength(initialCount - 1);
        },
        {
          timeout: 3000,
        },
      );
    });

    it('should not delete task when canceling dialog', async () => {
      const user = userEvent.setup();
      render(<TaskListPage />);

      await waitFor(() => {
        expect(screen.getByText('Revisar documentação da API')).toBeInTheDocument();
      });

      const initialDeleteButtons = screen.getAllByRole('button', { name: /excluir tarefa/i });
      const initialCount = initialDeleteButtons.length;

      await user.click(initialDeleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Excluir Tarefa')).toBeInTheDocument();
      });

      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      await user.click(cancelButton);

      await waitFor(() => {
        const deleteButtons = screen.getAllByRole('button', { name: /excluir tarefa/i });
        expect(deleteButtons).toHaveLength(initialCount);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should display error message when fetching tasks fails', async () => {
      server.get('/tasks', () => {
        return new Response(500, {}, { error: 'Erro ao buscar tarefas' });
      });

      render(<TaskListPage />);

      await waitFor(() => {
        expect(
          screen.getByText('Erro ao carregar tarefas. Por favor, tente novamente mais tarde.'),
        ).toBeInTheDocument();
      });
    });

    it('should display error message when complete task fails', async () => {
      server.patch('/tasks/:id', () => {
        return new Response(500, {}, { error: 'Erro ao atualizar tarefa' });
      });

      const user = userEvent.setup();
      render(<TaskListPage />);

      await waitFor(() => {
        expect(screen.getByText('Revisar documentação da API')).toBeInTheDocument();
      });

      const completeButtons = screen.getAllByRole('button', { name: /marcar como concluída/i });
      await user.click(completeButtons[0]);

      await waitFor(() => {
        expect(
          screen.getByText('Erro ao atualizar tarefa. Por favor, tente novamente mais tarde.'),
        ).toBeInTheDocument();
      });
    });

    it('deve exibir mensagem de erro ao falhar ao deletar tarefa', async () => {
      server.delete('/tasks/:id', () => {
        return new Response(500, {}, { error: 'Erro ao deletar tarefa' });
      });

      const user = userEvent.setup();
      render(<TaskListPage />);

      await waitFor(() => {
        expect(screen.getByText('Revisar documentação da API')).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByRole('button', { name: /excluir tarefa/i });
      await user.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
      });

      const confirmButton = screen.getByRole('button', { name: /excluir/i });
      await user.click(confirmButton);

      await waitFor(() => {
        expect(screen.getByText('Erro ao excluir tarefa. Por favor, tente novamente mais tarde.')).toBeInTheDocument();
      });
    });
  });
});
