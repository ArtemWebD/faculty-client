import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import { GroupTree } from '../../../store/types/group.type';
import { StatusTree } from '../../../store/types/status.type';
import { StudentTree } from '../../../store/types/student.type';
import { ChangeBar } from './ChangeBar';
import { SearchBar } from './SearchBar';
import { useActions } from '../../../hooks/action.hook';
import { DirectionTree } from '../../../store/types/direction.type';

interface IProps {
  students: StudentTree;
  groups: GroupTree;
  statuses: StatusTree;
  directions: DirectionTree;
}

interface ICheckboxes {
  [id: number]: boolean;
}

interface ChangeState {
  [id: number]: NodeJS.Timeout | null;
}

export const StudentsTable: React.FC<IProps> = ({ students, groups, statuses, directions }) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [checkboxes, setCheckboxes] = useState<ICheckboxes>({});
  const [mainCheckbox, setMainCheckbox] = useState(false);
  const [change, setChange] = useState<ChangeState>({});
  const { updateStudents } = useActions();

  useEffect(() => {
    setInitialCheckboxes();
  }, []);

  function setInitialCheckboxes() {
    Object.keys(students).forEach((i) => {
      setCheckboxes((prev) => ({
        ...prev,
        [+i]: false,
      }));
    });
    setChecked([]);
  }

  function checkboxHandler(event: React.ChangeEvent<HTMLInputElement>, id: number) {
    setCheckboxes((prev) => ({
      ...prev,
      [id]: event.target.checked,
    }));

    if (event.target.checked) {
      setChecked((prev) => [...prev, id]);
    } else {
      setChecked(
        checked.filter((value) => id !== value)
      );
    }
  }

  function toggleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    setMainCheckbox(event.target.checked);

    if (checked.length) {
      setChecked([]);
      setInitialCheckboxes();
    } else {
      const id = Object.keys(students).map((value) => +value);

      setChecked(id);

      id.forEach((value) => {
        setCheckboxes((prev) => ({
          ...prev,
          [value]: true,
        }));
      });
    }
  }

  function changeBarSubmit() {
    setInitialCheckboxes();
    setMainCheckbox(false);
  }

  function changeHandler(id: number, event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const name = event.target.name;
    const timeout = change[id];

    if (!value) {
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
      change[id] = null;
    }

    setChange((prev) => ({ ...prev, [id]: timeoutHandler(id, name, value) }));
  }

  function timeoutHandler(id: number, name: string, value: string): NodeJS.Timeout {
    return setTimeout(async () => {
      await updateStudents({
        id: [id],
        [name]: value,
      }, "Запись успешно изменена");
    }, 2000);
  }

  return (
    <>
      <SearchBar groups={groups} statuses={statuses} page={0} take={50} />
      {
        !!checked.length 
          && <ChangeBar groups={groups} statuses={statuses} directions={directions} id={checked} onSubmit={changeBarSubmit} />
      }
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <InputGroup.Checkbox checked={mainCheckbox} onChange={toggleChecked} />
            </th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Направление</th>
            <th>Курс</th>
            <th>Группа</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(students).map((i) => (
              <tr key={i}>
                <th>
                  <InputGroup.Checkbox
                    checked={checkboxes[+i]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkboxHandler(e, +i)} 
                  />
                </th>
                <th>
                  <input 
                    type="text" 
                    name='lastname'
                    defaultValue={students[+i].lastname} 
                    className='no-styled-input' 
                    onChange={(event) => changeHandler(+i, event)} 
                  />
                </th>
                <th>
                  <input 
                    type="text" 
                    name='firstname'
                    defaultValue={students[+i].firstname} 
                    className='no-styled-input' 
                    onChange={(event) => changeHandler(+i, event)} 
                  />
                </th>
                <th>
                  <input 
                    type="text" 
                    name='patronymic'
                    defaultValue={students[+i].patronymic} 
                    className='no-styled-input' 
                    onChange={(event) => changeHandler(+i, event)} 
                  />
                </th>
                <th>{directions[students[+i].direction.id]}</th>
                <th>{students[+i].course}</th>
                <th>{groups[students[+i].group.id]}</th>
                <th>
                  {
                    students[+i].status
                    // @ts-ignore
                      ? statuses[students[+i].status.id]
                      : "-"
                  }
                </th>
              </tr>
            ))
          }  
        </tbody>
      </Table>
    </>
  );
}