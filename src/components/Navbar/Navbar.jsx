import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const NavbarHeader = () => {
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav>Routines</Nav>
            <Nav>Exercises</Nav>
          </Nav>
          <Nav>
            <Nav
            onClick={()=>navigate("/login")}
            >Log In</Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
