//import modules
import { useState, useEffect } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { toast } from "react-toastify";

// navbar function
const MyNavBar = ({ setAuth, isAuth, userName, getUserName }) => {

  // logout function
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully.");
  };

  const GuestDropDown = () => {
    return (
      <NavDropdown title="Login/Register">
        <NavDropdown.Item href={"/login"}>Login</NavDropdown.Item>
        <NavDropdown.Item href={"/register"}>Register</NavDropdown.Item>
      </NavDropdown>
    );
  };

  const UserDropDown = () => {
    getUserName()
    return (
      <NavDropdown title={`Hi! ${userName}`}>
        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          onClick={(e) => {
            logout(e);
          }}
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    );
  };

  const LoggedDropDown = ({ isAuth }) => {
    return isAuth ? <UserDropDown /> : <GuestDropDown />;
  };

  return (
    <div>
      {/* bootstrap navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container data-testid="container">
          <Nav className="me-auto">
            <Navbar.Brand href="/">
              <img
                alt=""
                src="https://raw.githubusercontent.com/adnjoo/capstone/main/assets/mona2.png"
                width="25"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              artExplorer
            </Navbar.Brand>

            <Nav.Link href="/artworks">Artworks</Nav.Link>
            <Nav.Link href="/artmovements">Art-movements</Nav.Link>
            <Nav.Link href="/popularartists">Popular artists</Nav.Link>
          </Nav>

          <LoggedDropDown isAuth={isAuth} />
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavBar;
