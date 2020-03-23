import React from "react";
import {Nav, Navbar, NavDropdown, Button, Form, FormControl } from "react-bootstrap";
import "./Radiobutton.css";

class Navigation extends React.Component {
  
  render() {
    return (
      <div>
        <Navbar bg="faded" className = "Navbar" variant="dark" fixed="top">
          <Navbar.Brand href="#home">
            Routing Engine
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link className="inactive" activeClassName="active" href="https://www.cpf.gov.sg/members" >CPF Board</Nav.Link>
            <Nav.Link  className="inactive" activeClassName="active" href="https://apps.apple.com/sg/app/mycpf/id389277976">Download App</Nav.Link>
            <NavDropdown className="inactive" activeClassName="active" title="Connect with us" id="basic-nav-dropdown" >
              <NavDropdown.Item href="https://www.facebook.com/CPFBoard/">Facebook</NavDropdown.Item>
              <NavDropdown.Item href="https://twitter.com/cpf_board?lang=en">Twitter </NavDropdown.Item>
              <NavDropdown.Item href="https://www.instagram.com/cpf_board/?hl=en">Instagram</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://istd.sutd.edu.sg">Company</NavDropdown.Item>
          </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
