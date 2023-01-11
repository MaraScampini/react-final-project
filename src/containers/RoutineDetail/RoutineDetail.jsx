import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExerciseContext } from "../../context/ExerciseContext";
import {
  editSet,
  getRoutineById,
  getSetsByRoutine,
  newSet,
} from "../../services/ApiCalls";

function RoutineDetail() {
  const { routineId, editRoutineHandler } = useContext(ExerciseContext);
  let idRoutine = routineId || localStorage.getItem("routine");
  const navigate = useNavigate();

  const [sets, setSets] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [routine, setRoutine] = useState({});
  const [editing, setEditing] = useState({
    active: false,
    set: "",
  });
  const [body, setBody] = useState({
    id: "",
    reps: "",
    weight: "",
    routine: idRoutine,
  });

  let bodyAdd = {
    reps: 0,
    weight: 0,
    exercise: "",
    routine: idRoutine,
  };

  useEffect(() => {
    getSetsByRoutine(idRoutine).then((data) => setSets(data));
  }, []);

  useEffect(() => {
    getRoutineById(idRoutine).then((data) => setRoutine(data));
  }, []);

  useEffect(() => {
    setExercises(routine?.exercises);
  }, [routine]);

  useEffect(
    () => {
      getSetsByRoutine(idRoutine).then((data) => setSets(data));
    },
    [editing]
  );

  const editHandler = (set) => {
    setEditing({
      active: true,
      set: set,
    });
  };

  const cancelEdit = () => {
    setEditing({
      active: false,
      set: "",
    });
  };

  const addExerciseHandler = () => {
    editRoutineHandler();
    navigate("/exercises");
  };

  const addSetHandler = (exerciseId) => {
    bodyAdd = {
      reps: 0,
      weight: 0,
      exercise: parseInt(exerciseId),
      routine: idRoutine,
    };
    newSet(bodyAdd).then((data) =>
      setEditing({
        active: true,
        set: data.id_set,
      })
    );
  };

  const inputHandler = (field, value, set) => {
    setBody((prevState) => ({
      ...prevState,
      id: set,
      [field]: parseInt(value),
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    editSet(body)
    .then(() =>
      setEditing({
        active: false,
        set: "",
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <p className="lifterTitle">{routine?.name}</p>
        </Col>
      </Row>
      <Row className="d-flex flex-column ">
        <Col>
          {exercises?.map((exercise, index) => {
            return (
              <div key={index}>
                <p className="lifterText">{exercise?.name}</p>
                {sets.map((set, index) => {
                  return set?.exerciseIdExercise === exercise?.id_exercise ? (
                    <div key={index} className="d-flex">
                      {editing && set.id_set === editing.set ? (
                        <Form
                          className="d-flex"
                          onSubmit={(e) => submitHandler(e)}
                        >
                          <Form.Group className="d-flex">
                            <Form.Label>REPS</Form.Label>
                            <Form.Control
                              type="text"
                              name="reps"
                              placeholder="0"
                              className="lifterInput narrow"
                              onChange={(e) =>
                                inputHandler(
                                  e.target.name,
                                  e.target.value,
                                  set.id_set
                                )
                              }
                            ></Form.Control>
                            <Form.Label>WEIGHT</Form.Label>
                            <Form.Control
                              type="text"
                              name="weight"
                              placeholder="0"
                              className="lifterInput narrow"
                              onChange={(e) =>
                                inputHandler(
                                  e.target.name,
                                  e.target.value,
                                  set.id_set
                                )
                              }
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group className="d-flex justify-content-center mt-3">
                            <Button
                              className="lifterButton mt-0 mt-lg-4 ms-3 ms-lg-5 mb-4 mb-lg-0 narrow"
                              type="submit"
                            >
                              ✓
                            </Button>
                            <Button
                              className="lifterButton mt-0 mt-lg-4 ms-3 ms-lg-5 mb-4 mb-lg-0 narrow"
                              onClick={() => cancelEdit()}
                            >
                              ✗
                            </Button>
                          </Form.Group>
                        </Form>
                      ) : (
                        <div>
                          <p>
                            <span className="me-5">REPS</span>
                            <span className="me-5">{set.reps}</span>
                          </p>
                          <p>
                            <span className="me-4">WEIGHT</span>
                            <span>{set.weight}</span>
                          </p>
                          <Button
                            className="lifterButton mt-0 mt-lg-4 ms-3 ms-lg-5 mb-4 mb-lg-0"
                            onClick={() => editHandler(set.id_set)}
                          >
                            EDIT
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div key={index}></div>
                  );
                })}
                <Button
                  className="lifterButton mt-0 mt-lg-4 ms-3 ms-lg-5 mb-4 mb-lg-0"
                  onClick={() => addSetHandler(exercise.id_exercise)}
                >
                  ADD SET
                </Button>
              </div>
            );
          })}
        </Col>
        <Col className="d-flex justify-content-center">
          <Button
            className="lifterButton mt-3 mb-3"
            onClick={() => addExerciseHandler()}
          >
            ADD EXERCISE
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default RoutineDetail;
