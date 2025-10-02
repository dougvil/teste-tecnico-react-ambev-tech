import { Chip } from '@mui/material';
import { TASK_STATUS_CONFIG } from './TaskStatus.constants';
import type { TaskStatusProps } from './TaskStatus.types';

export const TaskStatus = ({ status, size = 'small' }: TaskStatusProps) => {
  const config = TASK_STATUS_CONFIG[status];

  return (
    <Chip
      label={config.label}
      size={size}
      color={config.color}
      sx={{ fontWeight: 500 }}
    />
  );
};
