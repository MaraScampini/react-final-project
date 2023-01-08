import React, { createContext, useEffect, useState } from "react";

export const ExerciseContext = createContext();

export function ExerciseContextProvider({ children }) {

  const [exerciseId, setExerciseId] = useState("");

  const exerciseHandler = (id) => {
    setExerciseId(id);
    localStorage.setItem("exercise", exerciseId);
  };

  return (
    <ExerciseContext.Provider
      value={{
        exerciseId,
        exerciseHandler,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
