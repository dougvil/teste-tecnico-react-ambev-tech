import Modal from '@/components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { FormCreateTask } from './_partials/FormCreateTask/FormCreateTask';

export const TaskNew = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/tasks');
  };

  const handleSuccess = () => {
    navigate('/tasks');
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      title='Nova Tarefa'
      maxWidth='sm'
    >
      <FormCreateTask
        onSuccess={handleSuccess}
        onCancel={handleClose}
      />
    </Modal>
  );
};
