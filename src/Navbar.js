import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, } from 'reactstrap';
import {Link, } from "react-router-dom";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    this.logout = this.logout.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  logout () {
    delete localStorage.token;
    delete localStorage.user;
    window.location.href="./"
  }



  render() {

    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto"> Ghost Racer </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem className="linkIcons">
                <Link to="/"> Home </Link>
              </NavItem>
              <NavItem className="linkIcons">
               <Link to="GhostRacer"> Ghost Racer </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}