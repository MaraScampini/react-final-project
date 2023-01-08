import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import hero from '../../assets/hero-image.jpg'

function Landing() {
  const navigate = useNavigate();
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
            <p className='landingText'>Consistence has never been easier</p>
            
          </div>
          <Button
            id="landingButton"
            className="mt-3 mt-sm-5"
            onClick={() => navigate("/register")}
          >
            REGISTER
          </Button>
          <div className="lifterDownText">
            <p> Already have an account?</p>
            <p className="lifterLink whiteText" onClick={()=>navigate("/login")}> Login</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Landing