import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { AddButton } from '../../../common/button/AddButton';
import { useActions } from '../../../hooks/action.hook';
import { GroupTree } from '../../../store/types/group.type';
import { AddStatusModal } from './AddStatusModal';
import { DeleteStatusModal } from './DeleteStatusModal';

interface IProps {
  statuses: GroupTree;
}

interface ChangeState {
  [id: number]: NodeJS.Timeout | null;
}

export const StatusTable: React.FC<IProps> = ({ statuses }) => {
  const [change, setChange] = useState<ChangeState>({});
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const { editStatus } = useActions();

  function changeHandler(id: number, event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const timeout = change[id];

    if (!value) {
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
      change[id] = null;
    }

    setChange((prev) => ({ ...prev, [id]: timeoutHandler(id, value) }));
  }

  function timeoutHandler(id: number, value: string): NodeJS.Timeout {
    return setTimeout(async () => {
      await editStatus(id, value);
    }, 1500);
  }

  function toggleModal() {
    setShow(!show);
  }

  function removeStatus(id: number) {
    setRemoveId(id);
    setShowModal(true);
  }

  function handleClose() {
    setRemoveId(null);
    setShowModal(false);
  }

  return (
    <>
      <Table className='mt-5'>
        <tbody>
          <tr>
            <td colSpan={2}>
              <AddButton text='Добавить статус' clickHandler={toggleModal}  />
            </td>
          </tr>
          {
            Object.keys(statuses).map((i) => (
              <tr key={i}>
                <td>
                  <input 
                    type="text" 
                    defaultValue={statuses[+i]} 
                    className='no-styled-input' 
                    onChange={(event) => changeHandler(+i, event)} 
                  />
                </td>
                <td className='cursor-pointer text-center' onClick={() => removeStatus(+i)}>
                  Удалить
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <AddStatusModal show={show} handleClose={toggleModal} />
      {
        removeId && <DeleteStatusModal show={showModal} handleClose={handleClose} id={removeId} />
      }
    </>
  );
}