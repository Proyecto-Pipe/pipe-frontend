import React from "react";

import { Plant } from "./Plant";
import { PipeControls } from "./PipeControls";

import "./PipeData.css";

import objUrl from "../../assets/3d/plant_default.gltf";

function PipeData() {
  console.log(objUrl);
  return (
    <div className="PipeData">
      <Plant url={objUrl} className="PipeData__plant" />
      <PipeControls className="PipeData__controls" />
      <div className="PipeData__recommendations"></div>
      <div className="PipeData__moreAbout">
        <a href="https://www.flaticon.com/free-icons/water" title="water icons">
          Water icons created by Good Ware - Flaticon
        </a>
        <button>? More about P.I.P.E.</button>
      </div>
    </div>
  );
}

export { PipeData };
