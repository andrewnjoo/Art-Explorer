// import modules
import React from 'react';
import {
  Navbar, Container, NavDropdown, Nav,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

function GuestDropDown() {
  return (
    <NavDropdown title="Login" className="ms-auto">
      <NavDropdown.Item href="/login">Login</NavDropdown.Item>
      <NavDropdown.Item href="/register">Register</NavDropdown.Item>
    </NavDropdown>
  );
}

function LoggedDropDown({
  isAuth, getUserName, userName, setAuth,
}) {
  return isAuth
    ? (
      <UserDropDown
        getUserName={getUserName}
        userName={userName}
        setAuth={setAuth}
      />
    ) : <GuestDropDown />;
}

function UserDropDown({ getUserName, userName, setAuth }) {
  getUserName();
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out successfully.');
  };
  return (
    <NavDropdown title={`Hi! ${userName}`}>
      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        onClick={(e) => {
          logout(e, setAuth);
        }}
      >
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
}

function MyNavBar({
  isAuth, userName, getUserName, setAuth,
}) {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container data-testid="container">
          <Navbar.Brand href="/">
            <img
              alt=""
              src="https://raw.githubusercontent.com/adnjoo/capstone/main/assets/mona2.png"
              width="25"
              height="30"
              className="d-inline-block align-top"
            />
            {' '}
            Art Explorer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Center Left Nav Items */}
            <Nav>
              <Nav.Link href="/artworks">Artworks</Nav.Link>
              <Nav.Link href="/artmovements">Art Movements</Nav.Link>
              <Nav.Link href="/popularartists">Popular artists</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {/* Login Far Right */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LoggedDropDown
                isAuth={isAuth}
                getUserName={getUserName}
                userName={userName}
                setAuth={setAuth}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavBar;

// notes
// ms-auto means margin start auto
// LTR left -> right
// RTL right -> left
