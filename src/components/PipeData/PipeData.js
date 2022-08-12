import React from "react";

import "./PipeData.css";

function PipeData() {
  return (
    <div className="PipeData">
      <div className="PipeData__plant">
        <img
          className="PipeData__plant__design"
          src="https://st.depositphotos.com/1169502/2025/v/450/depositphotos_20257115-stock-illustration-abstract-eco-green-plant-with.jpg"
          alt="Ilustration of P.I.P.E"
        />
      </div>
      <div className="PipeData__controls"></div>
      <div className="PipeData__recommendations"></div>
      <div className="PipeData__moreAbout">
        <button>? More about P.I.P.E.</button>
      </div>
    </div>
  );
}

export { PipeData };
