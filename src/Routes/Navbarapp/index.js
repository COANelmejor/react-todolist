import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Container} from 'react-bootstrap';

const Navbarapp = () => {
  const accessToken = localStorage.getItem('access') || false;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-TodoList</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={accessToken ? '/dashboard' : '/'}>{accessToken ? 'Dashboard' : 'Login'}</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/logout" className="text-danger">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  };
export default Navbarapp;
