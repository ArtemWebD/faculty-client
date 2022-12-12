import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { StudentModal } from '../modal/StudentModal';

export const Navigation = () => {
  const [show, setShow] = useState(false);

  function toggleModal() {
    setShow(!show);
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant='dark'>
        <Container>
          <NavLink to='/'>
            <Navbar.Brand as={'span'}>AccountingJS</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to='/students'>
                <Nav.Link as={'span'}>Список студентов</Nav.Link>
              </NavLink>
              <NavDropdown title="Справочник" id="basic-nav-dropdown">
                <NavLink to='/groups'> 
                  <NavDropdown.Item as={'span'}>Группы</NavDropdown.Item>
                </NavLink>
                <NavLink to='/statuses'>
                  <NavDropdown.Item as={'span'}>Статусы студентов</NavDropdown.Item>
                </NavLink>
                <NavLink to='/directions'>
                  <NavDropdown.Item as={'span'}>Направления</NavDropdown.Item>
                </NavLink>
                <NavDropdown.Divider />
                <NavDropdown.Item as={'button'} onClick={toggleModal}>Добавить студента</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <StudentModal show={show} handleClose={toggleModal} />
    </>
  );
}
