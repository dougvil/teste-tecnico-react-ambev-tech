import Button from '@/components/Button/Button';
import Col from '@/components/Col/Col';
import Row from '@/components/Row/Row';
import { AddTaskOutlined } from '@mui/icons-material';
import { Card, CardContent, Container, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

export const TasksLayout = () => {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth='lg'
      sx={{ py: 3 }}
    >
      <Card elevation={0}>
        <CardContent>
          <Row
            alignItems={'center'}
            justifyContent='space-between'
            mb={3}
          >
            <Col>
              <Typography variant='h4'>Minhas Tarefas</Typography>
              <Typography
                variant='body2'
                color='textSecondary'
              >
                Gerencie todas as suas tarefas de forma organizada e eficiente em um só lugar
              </Typography>
            </Col>
            <Col size='auto'>
              <Button
                variant='contained'
                startIcon={<AddTaskOutlined />}
                onClick={() => navigate('/tasks/new')}
              >
                Adicionar nova tarefa
              </Button>
            </Col>
          </Row>
          <main>
            <Outlet />
          </main>
        </CardContent>
      </Card>
    </Container>
  );
};
