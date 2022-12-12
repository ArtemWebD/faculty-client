import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GroupTree } from '../../../store/types/group.type';
import { StatusTree } from '../../../store/types/status.type';
import "../styles/change-bar.scss";
import { useActions } from '../../../hooks/action.hook';
import { DeleteStudentsModal } from './DeleteStudentsModal';
import { DirectionTree } from '../../../store/types/direction.type';

interface IProps {
  groups: GroupTree;
  statuses: StatusTree;
  directions: DirectionTree;
  id: number[];
  onSubmit: () => void;
}

interface IStudentData {
  course?: number;
  group?: number;
  direction?: number;
  status?: number;
  [k: string]: number | undefined;
}

export const ChangeBar: React.FC<IProps> = ({ groups, statuses, directions, id, onSubmit }) => {
  const [studentData, setStudentData] = useState<IStudentData>({});
  const [show, setShow] = useState(false);
  const { updateStudents } = useActions();

  function setNumberStudentData(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target;

    setStudentData((prev) => ({
      ...prev,
      [target.id]: target.valueAsNumber,
    }));
  }

  function setSelectStudentData(event: React.ChangeEvent<HTMLSelectElement>): void {
    const target = event.target;
    const value = target.value ? +target.value : undefined;

    setStudentData((prev) => ({
      ...prev,
      [target.id]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let flag = false;

    for (const key in studentData) {
      if (studentData.hasOwnProperty(key)) {
        if (studentData[key]) {
          flag = true;
          break;
        }
      }
    }
    
    if (!flag) {
      return;
    }

    await updateStudents({ id, ...studentData });
    setStudentData({});
    (event.target as HTMLFormElement).reset();
    onSubmit();
  }

  function handleClose() {
    setShow(false);
    onSubmit();
  }

  return (
    <>
      <div className='change-bar'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md='2'>
              <Form.Control
                type="number"
                placeholder='Курс'
                id='course'
                value={studentData.course}
                onChange={setNumberStudentData}
                min={1}
                maxLength={1}
              />
            </Form.Group>
            <Form.Group as={Col} md='3'>
              <Form.Select id="direction" onChange={setSelectStudentData}>
                <option value="">Выберите направление</option>
                {
                  Object.keys(directions).map((i) => (
                    <option value={+i} key={i}>{directions[+i]}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md='2'>
              <Form.Select id="group" onChange={setSelectStudentData}>
                <option value="">Выберите группу</option>
                {
                  Object.keys(groups).map((i) => (
                    <option value={+i} key={i}>{groups[+i]}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md='2'>
              <Form.Select id="status" onChange={setSelectStudentData}>
                <option value="">Выберите статус</option>
                {
                  Object.keys(statuses).map((i) => (
                    <option value={+i} key={+i}>{statuses[+i]}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md='2'>
              <Button variant='primary' type='submit'>
                Изменить
              </Button>
            </Form.Group>
            <Form.Group as={Col} md='1'>
              <Button variant='danger' type='button' onClick={() => setShow(true)}>
                Удалить
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>
      <DeleteStudentsModal show={show} handleClose={handleClose} id={id} />
    </>
  );
}