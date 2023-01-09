import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getMyRoutines } from "../../services/ApiCalls";

function Routines() {
  let token = localStorage.getItem("jwt");
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    if (token) {
      getMyRoutines().then((data) => setRoutines(data));
    }
  }, []);

  if (token) {
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          {routines.map((routine, index) => {
            return (
              <Col key={index} xs="11" md="5" className="exerciseCard mx-3">
                <p className="lifterText">{routine.name}</p>
                <p className="resultsText">EXERCISES</p>
                <ul>
                  {routine.exercises.map((exercise, index) => {
                    return <li key={index}>{exercise.name}</li>;
                  })}
                </ul>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  } else {
    return <div>LOG IN TO SEE YOUR ROUTINES</div>;
  }
}

export default Routines;
