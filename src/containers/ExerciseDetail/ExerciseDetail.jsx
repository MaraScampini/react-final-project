import React, { useContext, useEffect, useState } from 'react'
import { ExerciseContext } from '../../context/ExerciseContext'
import { getExerciseById } from '../../services/ApiCalls';

function ExerciseDetail() {
  const {exerciseId} = useContext(ExerciseContext);
  let idExercise = exerciseId || localStorage.getItem("exercise");
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    getExerciseById(idExercise)
    .then((data)=>setExercise(data));
  }, [])

  return (
    <div>{exercise.name}</div>
  )
}

export default ExerciseDetail