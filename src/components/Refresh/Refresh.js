import React from "react";
import { PipeContext } from "../../PipeContext";

import "./Refresh.css";

function Refresh() {
  const { setUpdate } = React.useContext(PipeContext);
  return (
    <button onClick={() => setUpdate(true)} className="Refresh">
      Reload P.I.P.E
    </button>
  );
}

export { Refresh };
