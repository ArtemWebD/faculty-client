import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Navigation } from '../../common/navbar/Navbar';
import { useActions } from '../../hooks/action.hook';
import { useTypedSelector } from '../../hooks/typed-selector.hook';
import { StudentsTable } from './components/StudentsTable';

export const StudentsPage: React.FC = () => {
  const { students } = useTypedSelector((state) => state.studentReducer);
  const { groups } = useTypedSelector((state) => state.groupReducer);
  const { statuses } = useTypedSelector((state) => state.statusReducer);
  const { directions } = useTypedSelector((state) => state.directionReducer);
  const { getStudents, getGroups, getStatuses, getDirections } = useActions();

  async function getData() {
    const isGroups = !!Object.keys(groups).length;
    const isStudents = !!Object.keys(students).length;
    const isStatuses = !!Object.keys(statuses).length;
    const isDirections = !!Object.keys(directions).length;

    if (!isGroups) {
      await getGroups();
    }

    if (!isStatuses) {
      await getStatuses();
    }

    if (!isDirections) {
      await getDirections();
    }

    if (!isStudents) {
      await getStudents({ take: 50, page: 0 });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navigation />
      <Container>
        {
          <StudentsTable students={students} groups={groups} statuses={statuses} directions={directions} />
        }
      </Container>
    </>
  );
}