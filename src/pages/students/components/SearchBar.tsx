import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useActions } from '../../../hooks/action.hook';
import { GroupTree } from '../../../store/types/group.type';
import { StatusTree } from '../../../store/types/status.type';

interface IProps {
  groups: GroupTree;
  statuses: StatusTree;
  take: number;
  page: number;
}

interface IStudentData {
  firstname?: string;
  lastname?: string;
  patronymic?: string;
  course?: number;
  group?: number;
  status?: number;
  [k: string]: string | number | undefined;
}

export const SearchBar: React.FC<IProps> = ({ groups, statuses, take, page }) => {
  const [studentData, setStudentData] = useState<IStudentData>({});
  const { getStudents } = useActions();

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
    const value = target.value ? +target.value : undefined;

    setStudentData((prev) => ({
      ...prev,
      [target.id]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await getStudents({ take, page, ...studentData });
    setStudentData({});
    (event.target as HTMLFormElement).reset();
  }
  
  return (
    <div className='change-bar'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md='2'>
            <Form.Control
              type="text"
              placeholder='Фамилия'
              id='lastname'
              value={studentData.lastname}
              onChange={setStringStudentData}
            />
          </Form.Group>
          <Form.Group as={Col} md='2'>
            <Form.Control
              type="text"
              placeholder='Имя'
              id='firstname'
              value={studentData.firstname}
              onChange={setStringStudentData}
            />
          </Form.Group>
          <Form.Group as={Col} md='2'>
            <Form.Control
              type="text"
              placeholder='Отчество'
              id='patronymic'
              value={studentData.patronymic}
              onChange={setStringStudentData}
            />
          </Form.Group>
          <Form.Group as={Col} md='1'>
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
          <Form.Group as={Col} md='1'>
            <Button variant='primary' type='submit'>
              Найти
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}