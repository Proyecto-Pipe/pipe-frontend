import React from "react";

import "./PipeVariable.css";

function PipeVariable({ name, value, metric }) {
  return (
    <p className="PipeVariable">
      {name}: {value}
      {metric}
    </p>
  );
}

export { PipeVariable };
