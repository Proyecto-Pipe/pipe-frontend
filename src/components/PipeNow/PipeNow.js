import React from "react";

import { Plant } from "../Plant";
import { PipeControls } from "./PipeControls";

import "./PipeNow.css";

import objUrl from "../../assets/3d/PIPE.gltf";

function PipeNow() {
  return (
    <div className="PipeNow">
      <Plant url={objUrl} className="PipeNow__plant" />
      <PipeControls className="PipeNow__controls" />
    </div>
  );
}

export { PipeNow };
