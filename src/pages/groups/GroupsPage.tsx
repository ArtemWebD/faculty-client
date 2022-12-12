import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Navigation } from '../../common/navbar/Navbar';
import { useActions } from '../../hooks/action.hook';
import { useTypedSelector } from '../../hooks/typed-selector.hook';
import { AddButton } from '../../common/button/AddButton';
import { AddGroupModal } from './components/AddGroupModal';
import { GroupsTable } from './components/GroupsTable';

export const GroupsPage: React.FC = () => {
  const { groups } = useTypedSelector((state) => state.groupReducer);
  const { getGroups } = useActions();
  const [show, setShow] = useState(false);

  async function getData() {
    const isGroups = !!Object.keys(groups).length;

    if (!isGroups) {
      await getGroups();
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
            !!Object.keys(groups).length
              ? <GroupsTable groups={groups} />
              : <>
                  <h1>Вы пока не добавили ни одной группы</h1>
                  <AddButton text='Добавить группу' clickHandler={toggleModal} />
                  <AddGroupModal show={show} handleClose={toggleModal} />
                </>
          }
        </Container>
      </main>
    </>
  );
}