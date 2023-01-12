import React, { createContext, useEffect, useState } from "react";

export const ExerciseContext = createContext();

export function ExerciseContextProvider({ children }) {

  const [exerciseId, setExerciseId] = useState("");
  const [routineId, setRoutineId] = useState("");
  const [editingRoutine, setEditingRoutine] = useState(false)

  const exerciseHandler = (id) => {
    setExerciseId(id);
    sessionStorage.setItem("exercise", id);
  };

  const routineHandler = (id) => {
    setRoutineId(id);
    sessionStorage.setItem("routine", id)
  }

  const editRoutineHandler = () => {
    editingRoutine===true ? setEditingRoutine(false) : setEditingRoutine(true)
  }



  return (
    <ExerciseContext.Provider
      value={{
        exerciseId,
        exerciseHandler,
        routineId,
        routineHandler,
        editingRoutine,
        editRoutineHandler
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
