import React, { createContext, useEffect, useState } from "react";

export const ExerciseContext = createContext();

export function ExerciseContextProvider({ children }) {

  const [exerciseId, setExerciseId] = useState("");
  const [routineId, setRoutineId] = useState("");

  const exerciseHandler = (id) => {
    setExerciseId(id);
    localStorage.setItem("exercise", exerciseId);
  };

  const routineHandler = (id) => {
    setRoutineId(id);
    localStorage.setItem("routine", id)
  }

  return (
    <ExerciseContext.Provider
      value={{
        exerciseId,
        exerciseHandler,
        routineId,
        routineHandler
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
