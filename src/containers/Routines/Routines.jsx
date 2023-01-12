import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Collapse, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExerciseContext } from "../../context/ExerciseContext";
import { getMyRoutines, getSetsByRoutine, newRoutine } from "../../services/ApiCalls";

function Routines() {
  let token = localStorage.getItem("jwt");
  const { routineId, routineHandler } = useContext(ExerciseContext);
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState({
    name: "",
    public: false,
  });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (token) {
      getMyRoutines().then((data) => setRoutines(data));
    }
  }, []);

  useEffect(() => {
    if (isChecked) {
      setBody((prevState) => ({
        ...prevState,
        public: true,
      }));
    }
  }, [isChecked]);

  const clickHandler = (routineId) => {
    routineHandler(routineId);
    navigate("/r_detail");
  };

  const inputHandler = (e) => {
    setBody((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const checkboxHandler = () => {
    setIsChecked(!isChecked);
  };

  const createRoutineHandler = (e) => {
    e.preventDefault();
    newRoutine(body)
    .then((data)=>routineHandler(data.id_routine))
    navigate("/r_detail")
  };

  

  if (token) {
    return (
      <Container>
        <Row>
          <Col className="d-flex flex-column align-items-center mb-4">
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="lifterButton"
            >
              new routine
            </Button>
            <Collapse className="mt-3" in={open}>
              <Form
                className="d-flex flex-column align-items-center"
                onSubmit={(e) => createRoutineHandler(e)}
              >
                <Form.Control
                  placeholder="Name of the routine"
                  onChange={(e) => inputHandler(e)}
                ></Form.Control>
                <Form.Check
                  id="default-checkbox"
                  label="Make public"
                  checked={isChecked}
                  onChange={checkboxHandler}
                  className="mt-2"
                />
                <Button type="submit" className="mobileButton mt-2">
                  Create
                </Button>
              </Form>
            </Collapse>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          {routines.map((routine, index) => {
            return (
              <Col
                onClick={() => clickHandler(routine.id_routine)}
                key={index}
                xs="11"
                md="5"
                className="exerciseCard mx-3"
              >
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
