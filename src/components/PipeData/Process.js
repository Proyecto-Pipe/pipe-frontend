import React from "react";

import "./Process.css";

function ProcessStatus({ process, name }) {
  return (
    <div
      className="ProcessStatus"
      style={{
        backgroundColor: process
          ? "rgba(132, 255, 44, 0.566)"
          : "rgba(79, 79, 79, 0.566)",
      }}
    >
      <p>{name}</p>
    </div>
  );
}

function Process({ date, isBulbOn, isPumpOn, isFanOn, automation, isTheLast }) {
  return (
    <div className="Process">
      <p className="Process__date">
        {date}
        {isTheLast ? " (Estado actual)" : ""}
      </p>
      <ProcessStatus process={isBulbOn} name={"Bombilla"} />
      <ProcessStatus process={isPumpOn} name={"Ventilador"} />
      <ProcessStatus process={isFanOn} name={"Bomba de agua"} />
      <ProcessStatus process={automation} name={"Automatización"} />
    </div>
  );
}

export { Process };
