import { TaskCardSkeleton } from '@/pages/Tasks/_partials/TaskCard/TaskCard.skeleton';
import Col from '../../../../components/Col/Col';
import Row from '../../../../components/Row/Row';

export const TaskListSkeleton = () => {
  return (
    <Row>
      {[1, 2, 3].map((index) => (
        <Col
          key={index}
          size={{ xs: 12, sm: 6, md: 4 }}
        >
          <TaskCardSkeleton />
        </Col>
      ))}
    </Row>
  );
};
