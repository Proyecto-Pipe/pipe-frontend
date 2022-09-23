import React from "react";

import { Plant } from "./Plant";
import { PipeControls } from "./PipeControls";

import "./PipeData.css";

import objUrl from "../../assets/3d/PIPE.gltf";

function PipeData() {
  return (
    <div className="PipeData">
      <Plant url={objUrl} className="PipeData__plant" />
      <PipeControls className="PipeData__controls" />
    </div>
  );
}

export { PipeData };
