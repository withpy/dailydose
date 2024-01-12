import React, { useContext } from "react";
import ErrorContext from "../context/errorContext";
export default function ErrorPage() {
  const errorMessage = useContext(ErrorContext);
  return (
    <div className="container text-center" style={{ marginTop: "4rem" }}>
      <h1>Oops!</h1>
      <p>{errorMessage.error}</p>
    </div>
  );
}
