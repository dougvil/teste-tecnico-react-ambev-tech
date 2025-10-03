import Modal from '@/components/Modal/Modal';
import { SnackbarAlert } from '@/components/Snackbar/SnackbarAlert';
import { useSnackbarAlert } from '@/components/Snackbar/SnackbarAlert.hook';
import { useNavigate } from 'react-router-dom';
import { FormCreateTask } from './_partials/FormCreateTask/FormCreateTask';

export const TaskNew = () => {
  const navigate = useNavigate();
  const [snackbarProps, setSnackbarProps] = useSnackbarAlert();

  const handleClose = () => {
    navigate('/tasks');
  };

  const handleSuccess = () => {
    navigate('/tasks');
  };

  const handleError = () => {
    setSnackbarProps({
      open: true,
      message: 'Erro ao criar tarefa. Por favor, tente novamente mais tarde.',
      severity: 'error',
    });
  };

  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        title='Nova Tarefa'
        maxWidth='sm'
      >
        <FormCreateTask
          onSuccess={handleSuccess}
          onCancel={handleClose}
          onError={handleError}
        />
      </Modal>
      <SnackbarAlert {...snackbarProps} />
    </>
  );
};
