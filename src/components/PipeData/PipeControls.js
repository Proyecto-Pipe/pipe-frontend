import React from "react";

import { PipeContext } from "../../PipeContext";

import "./PipeControls.css";

import airHumidityIcon from "../../assets/variables/airHumidity.png";
import soilHumidityIcon from "../../assets/variables/soilHumidity.png";
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
    backgroundColor:
      state === 1 ? "rgba(132, 255, 44, 0.566)" : "rgba(79, 79, 79, 0.566)",
  };
  return (
    <button onClick={callback} className="Control" style={dinamicStyle}>
      Turn {name} {!state ? "on" : "off"}
    </button>
  );
}

function PipeControls() {
  const {
    airHumidity,
    soilHumidity,
    temperature,
    light,
    isBulbOn,
    isFanOn,
    isPumpOn,
    loading,
    setIsBulbOn,
    setIsFanOn,
    setIsPumpOn,
  } = React.useContext(PipeContext);

  return (
    <div className="PipeControls">
      <Variable
        name="Air humidity"
        value={airHumidity}
        units="%"
        icon={airHumidityIcon}
      />
      <Variable
        name="Soil humidity"
        value={soilHumidity}
        units="%"
        icon={soilHumidityIcon}
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
        callback={() => setIsBulbOn(isBulbOn === 0 ? 1 : 0)}
        className="Control--bulb"
      />

      <Control
        name="fan"
        state={isFanOn}
        callback={() => setIsFanOn(isFanOn === 0 ? 1 : 0)}
        className="Control--fan"
      />

      <Control
        name="pump"
        state={isPumpOn}
        callback={() => setIsPumpOn(isPumpOn === 0 ? 1 : 0)}
        className="Control--pump"
      />

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
