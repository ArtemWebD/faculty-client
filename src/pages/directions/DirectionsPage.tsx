import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Navigation } from '../../common/navbar/Navbar';
import { useActions } from '../../hooks/action.hook';
import { useTypedSelector } from '../../hooks/typed-selector.hook';
import { AddButton } from '../../common/button/AddButton';
import { AddDirectionModal } from './components/AddDirectionModal';
import { DirectionsTable } from './components/DirectionsTable';

export const DirectionsPage: React.FC = () => {
  const { directions } = useTypedSelector((state) => state.directionReducer);
  const { getDirections } = useActions();
  const [show, setShow] = useState(false);

  async function getData() {
    const isDirections = !!Object.keys(directions).length;

    if (!isDirections) {
      await getDirections();
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
            !!Object.keys(directions).length
              ? <DirectionsTable directions={directions} />
              : <>
                  <h1>Вы пока не добавили ни одного направления</h1>
                  <AddButton text='Добавить направление' clickHandler={toggleModal} />
                  <AddDirectionModal show={show} handleClose={toggleModal} />
                </>
          }
        </Container>
      </main>
    </>
  );
}