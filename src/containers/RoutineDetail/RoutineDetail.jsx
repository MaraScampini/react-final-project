import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ExerciseContext } from "../../context/ExerciseContext";
import {
  getMyRoutines,
  getRoutineById,
  getSetsByRoutine,
} from "../../services/ApiCalls";

function RoutineDetail() {
  const { routineId } = useContext(ExerciseContext);
  let idRoutine = routineId || localStorage.getItem("routine")

  const [sets, setSets] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [routine, setRoutine] = useState({});

  useEffect(() => {
    getSetsByRoutine(idRoutine).then((data) => setSets(data));
  }, []);

  useEffect(() => {
    getRoutineById(idRoutine).then((data) => setRoutine(data));
  }, []);

  useEffect(() => {
    setExercises(routine.exercises);
  }, [routine]);

  return (
    <Container>
      <Row>
        <Col>
          <p>{routine.name}</p>
        </Col>
        <Col>
        {exercises?.map((exercise, index) => {
          return (
            <div key={index}>
            <p>{exercise.name}</p>
            {sets.map((set, index) => {
              return(
              set.exerciseIdExercise === exercise.id_exercise ? (
                <div key={index}>
                  <p>REPS</p>
                  <p>{set.reps}</p>
                  <p>WEIGHT</p>
                  <p>{set.weight}</p>
                </div>
              ) : (
                
                  <div key={index}></div>
                
              ))
            })}
            </div>
          )
        })}
        </Col>
      </Row>
    </Container>
  );
}

export default RoutineDetail;
