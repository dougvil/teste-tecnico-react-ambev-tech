export const TASK_STATUS_CONFIG = {
  COMPLETED: {
    label: 'Concluída',
    color: 'success' as const,
  },
  PENDING: {
    label: 'Pendente',
    color: 'default' as const,
  },
} as const;
