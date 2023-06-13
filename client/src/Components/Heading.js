import React from 'react'
import { Link } from 'react-router-dom'
//리액트 부트스트랩 사용
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Heading = () => {
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/App" style={{color : "white", textDecoration:"none"}}>Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/Upload" style={{color : "white", textDecoration:"none"}}>upload</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/List" style={{color : "white", textDecoration:"none"}}>list</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  </div>
  )
}
