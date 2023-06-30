import React from 'react'

//리액트 부트스트랩 사용
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import firebase from '../firebase.js';
import { Link, useNavigate } from 'react-router-dom';


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
                  <Link to="/">Home</Link>
                  <Link to="/Upload">Upload</Link> 
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
                <Link
                  to="/MyPage"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginRight: "10px",
                  }}
                >
                  MyPage
                </Link>
              </Navbar.Text>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              login
            </Link>
          )}
        </Navbar.Collapse>
        
      </Container>
    </Navbar>

  </div>
  )
}
