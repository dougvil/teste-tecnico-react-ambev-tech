import { z } from 'zod';

export const formEditTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(50, 'Título deve ter no máximo 50 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres'),
  status: z.enum(['PENDING', 'COMPLETED'], {
    message: 'Status é obrigatório',
  }),
});
