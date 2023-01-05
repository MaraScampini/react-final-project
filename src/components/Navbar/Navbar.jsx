import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/gym-near-svgrepo-com.svg";

const NavbarHeader = () => {
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" className="header">
      <Container fluid>
        <Navbar.Brand className="headerLink" onClick={() => navigate("/")}>
          <img src={logo} width="35" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav className="mx-3 headerLink">Routines</Nav>
            <Nav className="mx-3 headerLink">Exercises</Nav>
          </Nav>
          <Nav>
            <Nav className="headerLink mx-3" onClick={() => navigate("/login")}>
              Log In
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
