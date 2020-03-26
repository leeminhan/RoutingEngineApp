import React from "react";
import {Nav, Navbar, NavDropdown, Button, Form, FormControl } from "react-bootstrap";
<<<<<<< HEAD
// import Nav from "react-bootstrap/Nav"
// import Navbar from "react-bootstrap/Navbar";
// // import Form from "react-bootstrap";

const navigation = props => {
    
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default navigation;
=======
import "./Radiobutton.css";

const Navigation = props => {

    return (
      <div>
        <Navbar bg="faded" className = "NavBar" variant="dark" sticky="top">
          <Navbar.Brand href="#Home" className='Logo'>
          <img
            src={require('../Images/CPFlogo.png')}
            width="36"
            height="40.5"
            className="d-inline-block align-top"
          />
            <span style={{display: 'inline-block', width: '10px'}} />
            CPF Help Centre
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link className="NavButtons" href="#Home" >Home</Nav.Link>
            <Nav.Link className="NavButtons" href="#About" >About</Nav.Link>
            <Nav.Link className="NavButtons" href="https://www.cpf.gov.sg/members" >CPF Board</Nav.Link>
            <Nav.Link  className="NavButtons" href="#FAQ">FAQ</Nav.Link>

            
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button className = "SearchButton" variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </div>
    );
  
}

export default Navigation;
>>>>>>> Keith
