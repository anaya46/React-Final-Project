import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Offcanvas  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';

const NavBar = () => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if(token){
      setShow(true);
    }else{
      navigate("/login");
    }

  }
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  }

 
  
    return (
      <>
        <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/#/">e-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#/">
            <i className="fa-solid fa-house"></i>
            </Nav.Link>
            <Nav.Link href="/#/login">Login</Nav.Link>
            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
            {
              token &&  <Nav.Link as={Button} onClick={logOut}>Log Out</Nav.Link>
            }
            
          </Nav>
          
        </Navbar.Collapse>
        <Nav.Link as={Button} onClick={handleShow}>
        <i className="fa-solid fa-cart-shopping"></i>
            </Nav.Link>
      </Container>
    </Navbar>
  <CartSidebar show={show} handleClose={handleClose} />
  </>
    );
};

export default NavBar;