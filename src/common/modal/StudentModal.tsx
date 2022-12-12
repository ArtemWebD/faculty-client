import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTypedSelector } from '../../hooks/typed-selector.hook';
import { useActions } from '../../hooks/action.hook';
import { useValidate } from '../../hooks/validate.hook';
import { IAddStudent } from '../../store/types/student.type';

interface IProps {
  show: boolean;
  handleClose: () => void;
}

export const StudentModal: React.FC<IProps> = ({ show, handleClose }) => {
  const groupsState = useTypedSelector((state) => state.groupReducer);
  const statusState = useTypedSelector((state) => state.statusReducer);
  const directionState = useTypedSelector((state) => state.directionReducer);
  const { getGroups, getStatuses, addStudent, getDirections } = useActions();
  const { validate, validated } = useValidate();
  const initialStudentData = {
    firstname: "",
    lastname: "",
    patronymic: "",
    course: 1,
    group: 0,
    direction: 0,
  }
  const [studentData, setStudentData] = useState<IAddStudent>(initialStudentData);

  async function getData(): Promise<void> {
    const isGroups = !!Object.keys(groupsState.groups).length;
    const isStatuses = !!Object.keys(statusState.statuses).length;
    const isDirections = !!Object.keys(directionState.directions).length;

    if (!isGroups && !groupsState.loading) {
      await getGroups();
    }

    if (!isStatuses && !statusState.loading) {
      await getStatuses();
    }

    if (!isDirections && !directionState.loading) {
      await getDirections();
    }
  }

  useEffect(() => {
    getData();
  }, [groupsState.loading, statusState.loading, directionState.loading]);

  function setStringStudentData(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target;

    setStudentData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  }

  function setNumberStudentData(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target;

    setStudentData((prev) => ({
      ...prev,
      [target.id]: target.valueAsNumber,
    }));
  }

  function setSelectStudentData(event: React.ChangeEvent<HTMLSelectElement>): void {
    const target = event.target;

    if (!target.value) {
      return;
    }

    setStudentData((prev) => ({
      ...prev,
      [target.id]: +target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const isValidated = validate(event);

    if (!isValidated) {
      return;
    }

    await addStudent(studentData);
    setStudentData(initialStudentData);
    (event.target as HTMLFormElement).reset();
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить студента</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите фамилию"
                id="lastname"
                value={studentData.lastname}
                onChange={setStringStudentData}
                required 
              />
              <Form.Control.Feedback type="invalid">
                Пожалуйста, введите фамилию студента
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Введите имя"
              id="firstname"
              value={studentData.firstname}
              onChange={setStringStudentData}
              required 
            />
            <Form.Control.Feedback type="invalid">
              Пожалуйста, введите имя студента
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Отчество</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Введите отчество"
              id="patronymic"
              value={studentData.patronymic}
              onChange={setStringStudentData}
              required 
            />
            <Form.Control.Feedback type="invalid">
              Пожалуйста, введите отчество студента
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Курс</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Введите номер курса"
                id="course"
                value={studentData.course}
                onChange={setNumberStudentData}
                required 
                maxLength={1} 
                min={1} 
              />
              <Form.Control.Feedback type="invalid">
                Пожалуйста, введите номер курса студента
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select id="group" onChange={setSelectStudentData} required >
              <option value="">Выберите группу</option>
              {
                Object.keys(groupsState.groups).map((i) => (
                  <option value={+i} key={i}>{groupsState.groups[+i]}</option>
                ))
              }
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Пожалуйста, введите группу студента
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select id="direction" onChange={setSelectStudentData} required >
              <option value="">Выберите направление</option>
              {
                Object.keys(directionState.directions).map((i) => (
                  <option value={+i} key={i}>{directionState.directions[+i]}</option>
                ))
              }
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Пожалуйста, введите направление студента
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select id="status" onChange={setSelectStudentData}>
              <option value="">Выберите статус (необязательно)</option>
              {
                Object.keys(statusState.statuses).map((i) => (
                  <option value={+i} key={+i}>{statusState.statuses[+i]}</option>
                ))
              }
            </Form.Select>
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