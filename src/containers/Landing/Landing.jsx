import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    token ? setLoggedIn(true) : setLoggedIn(false);
  }, [token]);

  return (
    <Container fluid className="landingContainer">
      <Row>
        <Col>
          <p className="heroText text-center">LIFTER</p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <div className="text-center padding">
            <p className="landingText">Consistency has never been easier</p>
          </div>
          {loggedIn ? (
            <div>
              <Button
                className="mt-3 mt-sm-5 lifterButton"
                onClick={() => navigate("/routines")}
              >
                ROUTINES
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <Button
                className="mt-3 mt-sm-5 lifterButton"
                onClick={() => navigate("/register")}
              >
                start now
              </Button>
              <div className="lifterDownText">
                <p> Already have an account?</p>
                <p
                  className="lifterLink whiteText"
                  onClick={() => navigate("/login")}
                >
                  {" "}
                  Login
                </p>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
