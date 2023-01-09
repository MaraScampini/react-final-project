import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExerciseContext } from "../../context/ExerciseContext";
import { getMyRoutines, getSetsByRoutine } from "../../services/ApiCalls";

function Routines() {
  let token = localStorage.getItem("jwt");
  const {routineHandler} = useContext(ExerciseContext)
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);


  useEffect(() => {
    if (token) {
      getMyRoutines().then((data) => setRoutines(data));
    }
  }, []);

  const clickHandler = (routineId) => {
    routineHandler(routineId);
    navigate("/r_detail")
  }

  if (token) {
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          {routines.map((routine, index) => {
            return (
              <Col onClick={() => clickHandler(routine.id_routine)} key={index} xs="11" md="5" className="exerciseCard mx-3">
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
