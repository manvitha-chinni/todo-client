import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { logoutUser } from "../utils/auth";

const NavBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Link to="/home" className="navbar-brand">
          ToDo
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/analyze">
              Analyze
            </NavLink>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Button onClick={logoutUser}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
