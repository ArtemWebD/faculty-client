import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useValidate } from '../../../hooks/validate.hook';
import { useActions } from '../../../hooks/action.hook';

interface IProps {
  show: boolean;
  handleClose: () => void;
}

export const AddStatusModal: React.FC<IProps> = ({ show, handleClose }) => {
  const { validate, validated } = useValidate();
  const [title, setTitle] = useState("");
  const { addStatus } = useActions();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValidated = validate(event);

    if (!isValidated) {
      return;
    }

    await addStatus(title);
    setTitle("");
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить группу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Введите название статуса"
              id="lastname"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
            <Form.Control.Feedback type="invalid">
              Пожалуйста, введите название статуса
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Добавить
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}