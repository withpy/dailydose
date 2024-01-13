import React, { useState } from "react";
import ErrorContext from "./errorContext";
import LoadingProgressContext from "./loadingProgressContext";
import AlertContext from "./alertContext";

export default function ValueState(props) {
  const [error, setError] = useState(null);
  const [loadingProgress, setloadingProgress] = useState(0);
  const [alert, updatealert] = useState(null);
  const setalert = (type, message) => {
    updatealert({ message: message, type: type });
    setTimeout(() => {
      updatealert(null);
    }, 7000);
  };

  return (
    <LoadingProgressContext.Provider
      value={{ loadingProgress, setloadingProgress }}
    >
      <ErrorContext.Provider value={{ error, setError }}>
        <AlertContext.Provider value={{ alert, setalert }}>
          {props.children}
        </AlertContext.Provider>
      </ErrorContext.Provider>
    </LoadingProgressContext.Provider>
  );
}
