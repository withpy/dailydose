import React, { useContext } from "react";
import ErrorContext from "../context/errorContext";
export default function ErrorPage() {
  const errorMessage = useContext(ErrorContext);
  return (
    <div className="container text-center">
      <h1>Oops!</h1>
      <p>{errorMessage.error}</p>
    </div>
  );
}
