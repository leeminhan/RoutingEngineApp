import React from "react";
import {Nav, Navbar, NavDropdown, Button, Form, FormControl } from "react-bootstrap";
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
