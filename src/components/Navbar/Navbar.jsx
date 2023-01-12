import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/gym-near-svgrepo-com.svg";

const NavbarHeader = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const { decodedToken } = useJwt(token);
  const role = decodedToken?.role;
  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="header">
      <Container fluid>
        <Navbar.Brand className="lifterLink" onClick={() => navigate("/")}>
          <img src={logo} width="35" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav
              className="mx-3 lifterLink"
              onClick={() => navigate("/routines")}
            >
              Routines
            </Nav>
            <Nav
              className="mx-3 lifterLink"
              onClick={() => navigate("/exercises")}
            >
              Exercises
            </Nav>
          </Nav>
          {role === 1 ? (
            <Nav className="lifterLink mx-3" onClick={() => navigate("/admin")}>
              Admin
            </Nav>
          ) : (
            <div></div>
          )}
          {token ? (
            <Nav>
              <Nav
                className="lifterLink mx-3"
                onClick={() => navigate("/profile")}
              >
                Profile
              </Nav>
              <Nav className="lifterLink mx-3" onClick={() => logout()}>
                Log Out
              </Nav>
            </Nav>
          ) : (
            <Nav>
              <Nav
                className="lifterLink mx-3"
                onClick={() => navigate("/login")}
              >
                Log In
              </Nav>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
