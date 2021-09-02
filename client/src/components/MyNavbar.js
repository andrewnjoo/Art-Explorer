import {Navbar, Container} from 'react-bootstrap'

const MyNavbar = () => {
  return (
    <div>

<Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="https://raw.githubusercontent.com/adnjoo/capstone/main/assets/mona.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      artPassion
      </Navbar.Brand>
    </Container>
  </Navbar>

    </div>
  );
};


export default MyNavbar

