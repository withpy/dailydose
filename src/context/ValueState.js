import React, { useState } from "react";
import ErrorContext from "./errorContext";
import LoadingProgressContext from "./loadingProgressContext";
export default function ValueState(props) {
  const [error, setError] = useState(null);
  const [loadingProgress, setloadingProgress] = useState(10);
  return (
    <LoadingProgressContext.Provider value={{ loadingProgress, setloadingProgress }}>
      <ErrorContext.Provider value={{ error, setError }}>
        {props.children}
      </ErrorContext.Provider>
    </LoadingProgressContext.Provider>
  );
}
