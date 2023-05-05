import React from "react";

import { PipeContext } from "../../PipeContext";
import { InsertUserCode } from "./InsertUserCode";

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

function Control({ name, state, callback, disabled, disabledName }) {
  const dinamicStyle = {
    backgroundColor:
      state === 1 ? "rgba(132, 255, 44, 0.566)" : "rgba(79, 79, 79, 0.566)",
  };
  return (
    <button
      onClick={callback}
      className={disabled === 1 ? "Control Control--disabled" : "Control"}
      style={disabled === 1 ? {} : dinamicStyle}
      disabled={disabled === 1 ? "disabled" : ""}
    >
      {disabled === 1
        ? disabledName
        : `${!state ? "Activar " : "Desactivar "} ${name}`}
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
    automation,
    loading,
    setIsBulbOn,
    setIsFanOn,
    setIsPumpOn,
    setAutomation,
    displayInsertUserCode,
    setDisplayInsertUserCode,
    isUserCodeValid,
  } = React.useContext(PipeContext);

  function updateProcess(processSetter, processValue) {
    if (isUserCodeValid) {
      processSetter(processValue);
    } else {
      setDisplayInsertUserCode(true);
    }
  }

  return (
    <div className="PipeControls">
      <Variable
        name="Humedad del aire"
        value={airHumidity}
        units="%"
        icon={airHumidityIcon}
      />
      <Variable
        name="Humedad del suelo"
        value={soilHumidity}
        units="%"
        icon={soilHumidityIcon}
      />
      <Variable
        name="Temperatura"
        value={temperature}
        units="ºC"
        icon={temperatureIcon}
      />
      <Variable name="Luminosidad" value={light} units="%" icon={lightIcon} />
      <Control
        name="bombilla"
        state={isBulbOn}
        callback={() => updateProcess(setIsBulbOn, isBulbOn === 0 ? 1 : 0)}
        disabled={automation}
        disabledName={
          "La bombilla se activará si la luminosidad es inferior a 50%"
        }
      />
      <Control
        name="ventilador"
        state={isFanOn}
        callback={() => updateProcess(setIsFanOn, isFanOn === 0 ? 1 : 0)}
        disabled={automation}
        disabledName={
          "El ventilador se activará si la temperatura es inferior a 30%"
        }
      />
      <Control
        name="bomba de agua"
        state={isPumpOn}
        callback={() => updateProcess(setIsPumpOn, isPumpOn === 0 ? 1 : 0)}
        disabled={automation}
        disabledName={
          "La bomba de agua se activará si la humedad es inferior a 10%"
        }
      />
      <Control
        name="automatización"
        state={automation}
        callback={() => updateProcess(setAutomation, automation === 0 ? 1 : 0)}
        disabled={0}
        disabledName={"fasfas"}
      />
      {displayInsertUserCode && <InsertUserCode />}
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
