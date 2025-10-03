import type { Task } from '@/services/tasks';
import { mockTasks } from '@/test/mocks/tasks.mock';
import { createServer, Model, Response } from 'miragejs';
import type { ModelInstance } from 'miragejs/-types';

type TaskModel = ModelInstance<Task>;

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      task: Model,
    },
    seeds(server) {
      mockTasks.forEach((task) => {
        server.create('task', task as Task);
      });
    },

    routes() {
      this.namespace = 'api';
      this.timing = 600;

      this.get('/tasks', (schema) => {
        return schema.all('task');
      });

      this.get('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        return schema.find('task', id);
      });

      this.post('/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return schema.create('task', {
          ...attrs,
          status: attrs.status ?? 'PENDING',
        } as Task);
      });

      this.patch('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const taskFound = schema.find('task', id) as TaskModel | null;

        if (!taskFound) {
          return new Response(404, {}, { error: 'Task not found' });
        }

        taskFound.update({
          ...attrs,
        });

        return taskFound;
      });

      this.delete('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const taskFound = schema.find('task', id) as TaskModel | null;

        if (!taskFound) {
          return new Response(404, {}, { error: 'Task not found' });
        }

        taskFound.destroy();
        return new Response(204);
      });
    },
  });

  return server;
}
