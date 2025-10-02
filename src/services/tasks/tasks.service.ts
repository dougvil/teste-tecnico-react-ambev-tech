import type { CreateTaskInput, Task, UpdateTaskInput } from './tasks.types';

const API_URL = '/api/tasks';

export async function fetchTasks(): Promise<{ tasks: Task[] }> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Falha ao buscar tarefas');
  return response.json();
}

export async function fetchTask(id: string): Promise<{ task: Task }> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Falha ao buscar os detalhes da tarefa');
  return response.json();
}

export async function createTask(data: CreateTaskInput): Promise<{ task: Task }> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Falha ao criar tarefa');
  return response.json();
}

export async function updateTask({ id, data }: { id: string; data: UpdateTaskInput }): Promise<{ task: Task }> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Falha ao atualizar tarefa');
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Falha ao deletar tarefa');
}
