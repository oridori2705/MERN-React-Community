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
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/Upload">Upload</Nav.Link>
                  <Nav.Link href="/">list</Nav.Link>

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  </div>
  )
}
