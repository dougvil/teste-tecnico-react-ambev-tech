import type { Task } from '@/services/tasks';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Revisar documentação da API',
    description: 'Atualizar a documentação da API REST com os novos endpoints implementados e exemplos de uso',
    status: 'PENDING',
  },
  {
    id: '2',
    title: 'Implementar testes unitários',
    description: 'Criar testes unitários para os componentes React recém-criados, garantindo cobertura mínima de 80%',
    status: 'COMPLETED',
  },
  {
    id: '3',
    title: 'Corrigir bug no formulário de login',
    description: 'Investigar e corrigir o problema de validação que impede usuários com e-mails longos de fazer login',
    status: 'PENDING',
  },
];
