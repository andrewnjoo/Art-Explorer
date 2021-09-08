//import modules
import { Navbar, Container, NavDropdown } from "react-bootstrap";

// navbar function
const MyNavbar = () => {
  return (
    <div>
      {/* bootstrap navbar */}
      <Navbar bg="dark" variant="dark">
        <Container data-testid="container">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://raw.githubusercontent.com/adnjoo/capstone/main/assets/mona.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            artExplorer
          </Navbar.Brand>
          <NavDropdown>
            <NavDropdown.Item href={"/login"}>Login</NavDropdown.Item>
            <NavDropdown.Item href={"/register"}>Get Started</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
