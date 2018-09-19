import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand eventKey={1}>
            <a href="/">Home</a>
          </Navbar.Brand>
          <Nav>
            <NavItem eventKey={2} href="/about">
              About
            </NavItem>
          </Nav>
        </Navbar.Header>
      </Navbar>
    );
  }
}