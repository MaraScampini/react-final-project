import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExerciseContext } from "../../context/ExerciseContext";
import {
  deleteSet,
  editRoutine,
  editSet,
  getRoutineById,
  getSetsByRoutine,
  newSet,
} from "../../services/ApiCalls";

function RoutineDetail() {
  const { routineId, editRoutineHandler } = useContext(ExerciseContext);
  let idRoutine = routineId;
  if (!routineId) {
    idRoutine = sessionStorage.getItem("routine");
  }
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
  const [editingName, setEditingName] = useState(false);
  const [editBody, setEditBody] = useState({});

  let bodyAdd = {
    reps: 0,
    weight: 0,
    exercise: "",
    routine: idRoutine,
  };

  useEffect(() => {
    getSetsByRoutine(idRoutine).then((data) => setSets(data));
  }, [routine]);

  useEffect(() => {
    setExercises(routine?.exercises);
  }, [routine]);

  useEffect(() => {
    getRoutineById(idRoutine).then((data) => setRoutine(data));
  }, [idRoutine]);

  useEffect(() => {
    getRoutineById(idRoutine).then((data) => setRoutine(data));
  }, [editingName]);

  useEffect(() => {
    getSetsByRoutine(idRoutine).then((data) => setSets(data));
  }, [editing]);

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
    editSet(body).then(() =>
      setEditing({
        active: false,
        set: "",
      })
    );
  };

  const checkIfExerciseInRoutine = (id) => {
    sets.map((set) => {
      if (set.id_set === id) {
        return true;
      } else {
        return false;
      }
    });
  };

  const rechargeExercises = (id) => {
    if (!checkIfExerciseInRoutine(id)) {
      getRoutineById(idRoutine).then((data) => setRoutine(data));
    }
  };

  const deleteHandler = (setId) => {
    let deleteBody = {
      routine: parseInt(idRoutine),
      id: setId,
    };

    deleteSet(deleteBody)
      .then(() => getSetsByRoutine(idRoutine).then((data) => setSets(data)))
      .then(() => rechargeExercises(setId));
  };

  const nameInputHandler = (e) => {
    setEditBody({
      name: e.target.value,
      routine: idRoutine,
    });
  };

  const editNameHandler = (e) => {
    e.preventDefault();
    editRoutine(editBody).then(() => setEditingName(false));
  };

  return (
    <Container>
      <Row>
        <Col>
          {editingName ? (
            <Form onSubmit={(e) => editNameHandler(e)}>
              <Form.Control
                placeholder={routine?.name}
                onChange={(e) => nameInputHandler(e)}
              />
              <Form.Group className="d-flex ">
                <Button
                  className="mobileButton mt-0 ms-3 ms-lg-5 mb-4 mb-lg-0 narrow"
                  type="submit"
                >
                  ✓
                </Button>
                <Button
                  className="mobileButton mt-0 ms-3 ms-lg-5 mb-4 mb-lg-0 narrow"
                  onClick={() => setEditingName(false)}
                >
                  ✗
                </Button>
              </Form.Group>
            </Form>
          ) : (
            <p className="lifterTitle" onClick={() => setEditingName(true)}>
              {routine?.name}
            </p>
          )}
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
                    <div key={index}>
                      {editing && set.id_set === editing.set ? (
                        <Form onSubmit={(e) => submitHandler(e)}>
                          <Container className="setContainer">
                            <Row className="d-flex align-items-center setRow">
                              <Col xs="12" md="6" className="d-flex setColumn">
                                <Form.Group className="d-flex align-items-center">
                                  <Form.Label>REPS</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="reps"
                                    placeholder={set.reps}
                                    className="ms-3 me-3 lifterInput narrowInput "
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
                                    placeholder={set.weight}
                                    className="ms-3 me-3 lifterInput narrowInput"
                                    onChange={(e) =>
                                      inputHandler(
                                        e.target.name,
                                        e.target.value,
                                        set.id_set
                                      )
                                    }
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                              <Col md="6" className="setColumn">
                                <Form.Group className="d-flex ">
                                  <Button
                                    className="mobileButton mt-0 ms-3 ms-lg-5 mb-4 mb-lg-0 narrow"
                                    type="submit"
                                  >
                                    ✓
                                  </Button>
                                  <Button
                                    className="mobileButton mt-0 ms-3 ms-lg-5 mb-4 mb-lg-0 narrow"
                                    onClick={() => cancelEdit()}
                                  >
                                    ✗
                                  </Button>
                                </Form.Group>
                              </Col>
                            </Row>
                          </Container>
                        </Form>
                      ) : (
                        <Container className="setContainer">
                          <Row className="d-flex align-items-center setRow">
                            <Col xs="12" md="6" className="d-flex setColumn">
                              <p>
                                <span className="me-5">REPS</span>
                                <span className="me-5">{set.reps}</span>
                              </p>
                              <p>
                                <span className="me-4">WEIGHT</span>
                                <span>{set.weight}</span>
                              </p>
                            </Col>
                            <Col md="6" className="setColumn">
                              <Button
                                className="mobileButton mt-0 ms-0 ms-lg-5 me-3 mb-4 mb-lg-3 narrow"
                                onClick={() => editHandler(set.id_set)}
                              >
                                &#9998;
                              </Button>
                              <Button
                                className="mobileButton mt-0 ms-3 ms-lg-5 mb-4 mb-lg-3 narrow"
                                onClick={() => deleteHandler(set.id_set)}
                              >
                                ╳
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      )}
                    </div>
                  ) : (
                    <div key={index}></div>
                  );
                })}
                <div className="d-flex justify-content-center">
                  <Button
                    className="lifterButton mt-0 mt-lg-4 ms-3 ms-lg-0 mb-4 mb-lg-3"
                    onClick={() => addSetHandler(exercise.id_exercise)}
                  >
                    ADD SET
                  </Button>
                </div>
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
