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
        <Navbar.Collapse className="justify-content-end">
          {user.accessToken ? (
            <>
              <Navbar.Text
                style={{
                  color: "white",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => LogoutHandler()}
              >
                Logout
              </Navbar.Text>
              <br />
              <Navbar.Text style={{ color: "white", cursor: "pointer" }}>
                <Nav.Link
                  href="/MyPage"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginRight: "10px",
                  }}
                >
                  MyPage
                </Nav.Link>
              </Navbar.Text>
            </>
          ) : (
            <Nav.Link
              href="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              login
            </Nav.Link>
          )}
        </Navbar.Collapse>
        
      </Container>
    </Navbar>

  </div>
  )
}
