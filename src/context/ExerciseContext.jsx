import React, { createContext, useEffect, useState } from "react";

export const ExerciseContext = createContext();

export function ExerciseContextProvider({ children }) {

  const [exerciseId, setExerciseId] = useState("");
  const [routineId, setRoutineId] = useState("");
  const [editingRoutine, setEditingRoutine] = useState(false)

  const exerciseHandler = (id) => {
    setExerciseId(id);
    localStorage.setItem("exercise", exerciseId);
  };

  const routineHandler = (id) => {
    setRoutineId(id);
    localStorage.setItem("routine", id)
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
