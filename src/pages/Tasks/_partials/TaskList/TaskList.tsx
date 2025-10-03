import Col from '@/components/Col/Col';
import { TaskCard } from '../TaskCard/TaskCard';
import type { TaskListProps } from './TaskList.types';

export const TaskList = ({ tasks, onEdit, onComplete, onDelete, deletingTaskId, completingTaskId }: TaskListProps) => {
  return (
    <>
      {tasks.map((task) => (
        <Col
          key={task.id}
          size={{ xs: 12, sm: 6, md: 4 }}
        >
          <TaskCard
            task={task}
            onEdit={onEdit}
            onComplete={onComplete}
            onDelete={onDelete}
            isDeleting={deletingTaskId === task.id}
            isCompleting={completingTaskId === task.id}
          />
        </Col>
      ))}
    </>
  );
};
