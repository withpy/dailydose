import React, { useContext } from "react";
import AlertContext from "../context/alertContext";

function Alert(props) {
  const { alert } = useContext(AlertContext);
  return (
    alert && (
      <div className="container">
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      </div>
    )
  );
}

export default Alert;
