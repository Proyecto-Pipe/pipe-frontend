import React from "react";

import { PipeContext } from "../../PipeContext";

import "./PipeControls.css";

import humidityIcon from "../../assets/variables/drop.png";
import temperatureIcon from "../../assets/variables/temperature.png";
import lightIcon from "../../assets/variables/idea.png";

function Variable({ name, value, units, icon }) {
  const altValue = `Icon of ${name}`;

  return (
    <div className="Variable">
      <img src={icon} alt={altValue} className="Variable__img" />
      <p className="Variable__value">
        {name}:{" "}
        <span className="Variable__value__resalt">
          {value}
          {" " + units}
        </span>
      </p>
    </div>
  );
}

function Control({ name, state, icon, color, callback }) {
  return (
    <button className="Control">
      Turn {name} {!state ? "On" : "Off"}
    </button>
  );
}

function PipeControls() {
  const {
    humidity,
    temperature,
    light,
    isBulbOn,
    isPumpOn,
    lastPipeConnection,
    loading,
  } = React.useContext(PipeContext);

  return (
    <div className="PipeControls">
      <Variable
        name="Humidity"
        value={humidity}
        units="ºC"
        icon={humidityIcon}
      />
      <Variable
        name="Temperature"
        value={temperature}
        units="ºC"
        icon={temperatureIcon}
      />
      <Variable name="Light" value={light} units="%" icon={lightIcon} />
      <Control name="bulb" state={isBulbOn} className="Control--bulb" />
      <Control name="pump" state={isPumpOn} className="Control--pump" />
    </div>
  );
}

export { PipeControls };
