import React from 'react'

//리액트 부트스트랩 사용
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import firebase from '../firebase.js';
import { useNavigate } from 'react-router-dom';

export const Heading = () => {
  const user =useSelector((state)=>state.user);
  const navigate = useNavigate();

  const LogoutHandler = () =>{
    firebase.auth().signOut();
    alert("You have been logged out")
    navigate("/")
    
  }

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">Community</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/Upload">Upload</Nav.Link>        
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand className='justify-content-end'>
          {user.accessToken ? (<Navbar.Text onClick={()=>LogoutHandler()}>Logout</Navbar.Text>
            ): (<Nav.Link href="/login">Login</Nav.Link>)}
          
        </Navbar.Brand>
        
      </Container>
    </Navbar>

  </div>
  )
}
