import React from "react";

import { Plant } from "./Plant";

import "./PipeData.css";

import objUrl from "../../assets/3d-model.gltf";

function PipeData() {
  console.log(objUrl);
  return (
    <div className="PipeData">
      <Plant url={objUrl} className="PipeData__plant" />
      <div className="PipeData__controls"></div>
      <div className="PipeData__recommendations"></div>
      <div className="PipeData__moreAbout">
        <button>? More about P.I.P.E.</button>
      </div>
    </div>
  );
}

export { PipeData };
