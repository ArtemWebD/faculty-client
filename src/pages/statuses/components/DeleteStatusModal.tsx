import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useActions } from '../../../hooks/action.hook';

interface IProps {
  show: boolean;
  handleClose: () => void;
  id: number;
}

export const DeleteStatusModal: React.FC<IProps> = ({ show, handleClose, id }) => {
  const { removeStatus } = useActions();

  async function remove() {
    await removeStatus(id);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Вы уверены, что хотите удалить статус?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant='primary' onClick={remove}>
          Да
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}