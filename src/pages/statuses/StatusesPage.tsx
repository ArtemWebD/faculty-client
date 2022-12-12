import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { AddButton } from '../../common/button/AddButton';
import { Navigation } from '../../common/navbar/Navbar';
import { useActions } from '../../hooks/action.hook';
import { useTypedSelector } from '../../hooks/typed-selector.hook';
import { AddStatusModal } from './components/AddStatusModal';
import { StatusTable } from './components/StatusTable';

export const StatusesPage: React.FC = () => {
  const { statuses } = useTypedSelector((state) => state.statusReducer);
  const { getStatuses } = useActions();
  const [show, setShow] = useState(false);

  async function getData() {
    const isGroups = !!Object.keys(statuses).length;

    if (!isGroups) {
      await getStatuses();
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function toggleModal() {
    setShow(!show);
  }

  return (
    <>
      <Navigation />
      <main>
        <Container>
          {
            !!Object.keys(statuses).length
              ? <StatusTable statuses={statuses} />
              : <>
                  <h1>Вы пока не добавили ни одного статуса</h1>
                  <AddButton text='Добавить группу' clickHandler={toggleModal} />
                  <AddStatusModal show={show} handleClose={toggleModal} />
                </>
          }
        </Container>
      </main>
    </>
  );
}