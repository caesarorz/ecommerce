import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions';

import Search from './Search';

export default function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const dispatch = useDispatch()
  const {userInfo} = userLogin;

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
        <header>
          <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
            <Container fluid>
              <LinkContainer to='/'>
                <Navbar.Brand >eCommerce</Navbar.Brand>
              </LinkContainer>
              <Search/>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">

                <Nav
                  className="me-auto my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                >

                </Nav>
                <Nav
                  className="my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                >
                  <LinkContainer to="/cart" className="">
                    <Nav.Link> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                  </LinkContainer>

                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="username">
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer  to="/login">
                      <Nav.Link> <i className="fas fa-sign-in-alt"></i> Login</Nav.Link>
                    </LinkContainer>
                  )}

                  {!userInfo ? (
                    <LinkContainer  to="/register" className="">
                      <Nav.Link> <i className="fas fa-user"></i> Register</Nav.Link>
                    </LinkContainer>
                  ) : (
                    ""
                  )}


                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
  );
}
