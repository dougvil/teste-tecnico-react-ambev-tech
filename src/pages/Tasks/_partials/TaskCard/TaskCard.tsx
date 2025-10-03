import { Check, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Card, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { TaskStatus } from '../TaskStatus';
import {
  cardActionsStyles,
  cardContentStyles,
  deleteButtonStyles,
  descriptionStyles,
  getCardStyles,
  getCompleteButtonStyles,
  titleStyles,
} from './TaskCard.styles';
import type { TaskCardProps } from './TaskCard.types';

export const TaskCard = ({ task, onEdit, onComplete, onDelete, isDeleting, isCompleting }: TaskCardProps) => {
  const isCompleted = task.status === 'COMPLETED';

  return (
    <Card
      elevation={0}
      sx={getCardStyles(isCompleted)}
    >
      <CardContent sx={cardContentStyles}>
        <Stack spacing={1.5}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
            spacing={1}
          >
            <Typography
              variant='body1'
              sx={titleStyles}
            >
              {task.title}
            </Typography>
            <TaskStatus status={task.status} />
          </Stack>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={descriptionStyles}
          >
            {task.description}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={cardActionsStyles}>
        <IconButton
          aria-label='Excluir tarefa'
          title='Excluir tarefa'
          size='medium'
          onClick={() => onDelete(task.id)}
          sx={deleteButtonStyles}
          loading={isDeleting}
        >
          <DeleteOutline fontSize='small' />
        </IconButton>

        <IconButton
          aria-label='Editar tarefa'
          title='Editar tarefa'
          size='medium'
          onClick={() => onEdit(task.id)}
        >
          <EditOutlined fontSize='small' />
        </IconButton>
        <IconButton
          aria-label={'Marcar como concluída'}
          title={'Marcar como concluída'}
          size='medium'
          onClick={() => (isCompleted ? undefined : onComplete(task.id))}
          sx={getCompleteButtonStyles(isCompleted)}
          loading={isCompleting}
        >
          <Check fontSize='small' />
        </IconButton>
      </CardActions>
    </Card>
  );
};
