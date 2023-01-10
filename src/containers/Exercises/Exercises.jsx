import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExerciseContext } from "../../context/ExerciseContext";
import {
  getExerciseByName,
  getExercises,
  getExercisesByMaterial,
  getExercisesByMuscle,
  getExercisesDoubleFilter,
  newSet,
} from "../../services/ApiCalls";

function Exercises() {
  const { exerciseHandler, editingRoutine, routineId, editRoutineHandler } =
    useContext(ExerciseContext);
  const navigate = useNavigate();
  const idRoutine = routineId || localStorage.getItem("routine");

  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState("");
  const [filter2, setFilter2] = useState("");
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    getExercises().then((data) => setExercises(data));
  }, []);

  useEffect(() => {
    if (filter !== "" && filter2 === "") {
      getExercisesByMaterial(filter).then((data) => setExercises(data));
    } else if (filter === "" && filter2 !== "") {
      getExercisesByMuscle(filter2).then((data) => setExercises(data));
    } else if (filter !== "" && filter2 !== "") {
      let params = `${filter} ${filter2}`;
      getExercisesDoubleFilter(params).then((data) => setExercises(data));
    } else {
      getExercises().then((data) => setExercises(data));
    }
  }, [filter, filter2]);

  useEffect(() => {
    if (criteria === "") {
      getExercises().then((data) => setExercises(data));
    } else {
      getExerciseByName(criteria).then((data) => setExercises(data));
    }
  }, [criteria]);

  const eraseFilters = () => {
    setFilter("");
    setFilter2("");
  };

  let body = {
    routine: idRoutine,
    exercise: "",
    reps: 0,
    weight: 0,
  };

  const clickHandler = (exerciseId) => {
    console.log(exerciseId);
    if (editingRoutine === false) {
      exerciseHandler(exerciseId);
      navigate("/ex_detail");
    } else if (editingRoutine === true) {
      body = {
        routine: idRoutine,
        exercise: exerciseId,
        reps: 0,
        weight: 0,
      };
      newSet(body)
      .then(() => editRoutineHandler())
      .then(() => navigate("/r_detail"));
    }
  };

  const inputHandler = (e) => {
    setCriteria(`${e.target.value}`);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm="12" lg="3">
          <Dropdown>
            <Dropdown.Toggle
              className="lifterButton ms-3 my-3 my-md-0"
              id="dropdown-basic"
            >
              MATERIAL
            </Dropdown.Toggle>

            <Dropdown.Menu className="exerciseCard">
              <Dropdown.Item onClick={() => setFilter("barbell")}>
                Barbell
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("dumbbell")}>
                Dumbbell
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("machine")}>
                Machine
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("none")}>
                None
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("kettlebell")}>
                Kettlebell
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col sm="12" lg="3">
          <Dropdown>
            <Dropdown.Toggle
              className="lifterButton ms-3 my-3 my-md-0"
              id="dropdown-basic"
            >
              MUSCLE
            </Dropdown.Toggle>

            <Dropdown.Menu className="exerciseCard">
              <Dropdown.Item onClick={() => setFilter("abdominals")}>
                Abdominals
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("biceps")}>
                Biceps
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter("calves")}>
                Calves
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("chest")}>
                Chest
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("full%20body")}>
                Full Body
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("glutes")}>
                Glutes
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("hamstrings")}>
                Hamstrings
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("lower%20back")}>
                Lower Back
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("quadriceps")}>
                Quadriceps
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("shoulders")}>
                Shoulders
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("traps")}>
                Traps
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("triceps")}>
                Triceps
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter2("upper%20back")}>
                Upper Back
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col sm="12" lg="4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="search"
                placeholder="Search exercise"
                className="lifterInput"
                onChange={(e) => inputHandler(e)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        {exercises?.map((exercise, index) => {
          return (
            <Col xs="12" md="6" lg="4" key={index} className="d-flex">
              <Container
                className="exerciseCard"
                onClick={() => clickHandler(exercise.id_exercise)}
              >
                <Row>
                  <Col xs="5" className="exercisesText">
                    <div>Name</div>
                  </Col>
                  <Col xs="7" className="resultsText text-end">
                    <div>{exercise.name.toUpperCase()}</div>
                  </Col>
                </Row>
                <Row>
                  <Col xs="5" className="exercisesText">
                    <div>Material</div>
                  </Col>
                  <Col xs="7" className="resultsText text-end">
                    <div>{exercise.material}</div>
                  </Col>
                </Row>
                <Row className="d-flex align-items-center">
                  <Col xs="5" className="exercisesText">
                    <div>Main Muscle</div>
                  </Col>
                  <Col xs="7" className="resultsText text-end">
                    <div>{exercise.main_muscle}</div>
                  </Col>
                </Row>
              </Container>
            </Col>
          );
        })}
      </Row>
      {filter || filter2 ? (
        <Row>
          <Button className="lifterButton" onClick={() => eraseFilters()}>
            ERASE FILTERS
          </Button>
        </Row>
      ) : (
        <div></div>
      )}
    </Container>
  );
}

export default Exercises;
