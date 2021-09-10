//import modules
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";

// navbar function
const MyNavbar = ({ setAuth, isAuth }) => {
  // logout function
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully.");
  };

  return (
    <div>
      {/* bootstrap navbar */}
      <Navbar bg="dark" variant="dark">
        <Container data-testid="container">
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
          <NavDropdown title="Login">
            <NavDropdown.Item href={"/login"}>Login</NavDropdown.Item>
            <NavDropdown.Item href={"/register"}>Get Started</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={(e) => {
                logout(e);
              }}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
