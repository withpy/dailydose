import React from "react";
import loader from "./Rhombus.gif";
// import loader from "./pacman_loader.gif";

export default function Loader() {
  return (
    <div className="text-center" style={{ marginTop: "4rem" }}>
      <img src={loader} alt="loader" />
    </div>
  );
}
