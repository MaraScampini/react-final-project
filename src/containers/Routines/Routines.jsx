import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Collapse, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExerciseContext } from "../../context/ExerciseContext";
import {
  deleteRoutine,
  getMyRoutines,
  newRoutine,
} from "../../services/ApiCalls";

function Routines() {
  let token = sessionStorage.getItem("jwt");
  const { routineHandler } = useContext(ExerciseContext);
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
      .then((data) => routineHandler(data.id_routine))
      .then(() => getMyRoutines().then((data) => setRoutines(data)))
      .then(setOpen(false));
  };

  const deleteRoutineHandler = (id) => {
    let deleteBody = {
      routine: id,
    };
    deleteRoutine(deleteBody).then(() =>
      getMyRoutines().then((data) => setRoutines(data))
    );
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
            <Collapse in={open}>
              <div>
                <Form
                  className="d-flex flex-column align-items-center mt-3"
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
              </div>
            </Collapse>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          {routines?.map((routine, index) => {
            return (
              <Col
                key={index}
                xs="11"
                md="5"
                className="lifterCard mx-3 d-flex flex-column"
              >
                <div onClick={() => clickHandler(routine.id_routine)}>
                  <p className="lifterText">{routine.name}</p>
                  <p className="lifterProfile">EXERCISES</p>
                  <ul>
                    {routine.exercises.map((exercise, index) => {
                      return <li key={index} className="lifterProfile blackText smallText">{exercise.name}</li>;
                    })}
                  </ul>
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    className="mobileButton"
                    onClick={() => deleteRoutineHandler(routine.id_routine)}
                  >
                    DELETE
                  </Button>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  } else {
    return (
      <div className="lifterTitle d-flex justify-content-center">
        LOG IN TO SEE YOUR ROUTINES
      </div>
    );
  }
}

export default Routines;
