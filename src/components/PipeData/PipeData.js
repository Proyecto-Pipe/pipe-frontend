import React from "react";

import { Plant } from "./Plant";
import { PipeControls } from "./PipeControls";

import "./PipeData.css";

import objUrl from "../../assets/3d/plant_default.gltf";

function PipeData() {
  return (
    <div className="PipeData">
      <Plant url={objUrl} className="PipeData__plant" />
      <PipeControls className="PipeData__controls" />
      <div className="PipeData__recommendations"></div>
      <div className="PipeData__moreAbout">
        <a
          href="https://www.flaticon.com/free-icons/water"
          title="water icons"
        ></a>
        Water icons created by Good Ware - Flaticon
        <button>? More about P.I.P.E.</button>
      </div>
    </div>
  );
}

export { PipeData };
