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
  const dinamicStyle = {
    backgroundColor: state
      ? "rgba(132, 255, 44, 0.566)"
      : "rgba(79, 79, 79, 0.566)",
  };
  return (
    <button className="Control" style={dinamicStyle}>
      Turn {name} {!state ? "on" : "off"}
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
    toggleBulb,
    togglePump,
  } = React.useContext(PipeContext);

  const lastPipeConnectionDate = lastPipeConnection
    ? new Date(lastPipeConnection)
    : null;

  const lpcd = lastPipeConnectionDate;
  const formattedLastPipeConnection = lastPipeConnectionDate
    ? `Last updated: ${lpcd.toString()} `
    : "Can't get last P.I.P.E. connection";
  console.log(lastPipeConnection);
  console.log(formattedLastPipeConnection);

  return (
    <div className="PipeControls">
      <Variable
        name="Humidity"
        value={humidity}
        units="%"
        icon={humidityIcon}
      />
      <Variable
        name="Temperature"
        value={temperature}
        units="ºC"
        icon={temperatureIcon}
      />
      <Variable name="Light" value={light} units="%" icon={lightIcon} />

      <Control
        name="bulb"
        state={isBulbOn}
        callback={toggleBulb}
        className="Control--bulb"
      />

      <Control
        name="pump"
        state={isPumpOn}
        callback={togglePump}
        className="Control--pump"
      />

      <p>{formattedLastPipeConnection}</p>
      <button className="refresh">Refresh</button>

      {loading && (
        <div className="loading">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export { PipeControls };
