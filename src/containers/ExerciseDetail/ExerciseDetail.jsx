import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExerciseContext } from "../../context/ExerciseContext";
import { getExerciseById } from "../../services/ApiCalls";

function ExerciseDetail() {
  const URL = "https://gym-pictures-react-final-project.s3.amazonaws.com/";
  const navigate = useNavigate()

  const { exerciseId } = useContext(ExerciseContext);
  let idExercise = exerciseId || localStorage.getItem("exercise");
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    getExerciseById(idExercise).then((data) => setExercise(data));
  }, []);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center">
        <Col sm="12" lg="5">
          <p className="lifterTitle">{exercise.name}</p>
          <p>{exercise.main_muscle}</p>
          <p className="detailDescription">{exercise.description}</p>
        </Col>
        <Col sm="12" lg="5" className="d-flex justify-content-center">
          <img
            className="detailImage"
            src={`${URL}${exercise.image_path}`}
            alt=""
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col sm="12" md="5">
          <Button
            className="lifterButton detailButton"
            onClick={() => navigate("/exercises")}
          >
            GO BACK
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ExerciseDetail;
