import React from "react";

import { Plant } from "../Plant";
import { PipeControls } from "./PipeControls";
import { PipeProvider } from "../../PipeContext";

import "./PipeNow.css";

import objUrl from "../../assets/3d/PIPE.gltf";

function PipeNow() {
  return (
    <div className="PipeNow">
      <PipeProvider>
        <Plant url={objUrl} className="PipeNow__plant" />
        <PipeControls className="PipeNow__controls" />
      </PipeProvider>
    </div>
  );
}

export { PipeNow };
