import React from "react";

import { VariableChart } from "./VariableChart";
import { Process } from "./Process";
import { password, pipeRecordsApiUrl } from "../../env";
import "./PipeData.css";

import airHumidityIcon from "../../assets/variables/airHumidity.png";
import soilHumidityIcon from "../../assets/variables/soilHumidity.png";
import temperatureIcon from "../../assets/variables/temperature.png";
import lightIcon from "../../assets/variables/idea.png";

function twoDigits(digit) {
  return String(digit).padStart(2, "0");
}

function formatDatetime(date, addSeconds = false) {
  const dateGMT = new Date(`${date.replace(/-/g, "/")}  UTC`);
  const time = `${dateGMT.getHours()}:${twoDigits(dateGMT.getMinutes())}${
    addSeconds ? `:${twoDigits(dateGMT.getSeconds())}` : ""
  }`;
  return time;
}

function PipeData() {
  const [dateLabels, setDateLabels] = React.useState([]);
  const [airHumidityData, setAirHumidityData] = React.useState([]);
  const [soilHumidityData, setSoilHumidityData] = React.useState([]);
  const [temperatureData, setTemperatureData] = React.useState([]);
  const [lightData, setLightData] = React.useState([]);

  const [processHistory, setProcessHistory] = React.useState([]);

  const t = new Date();
  const [date, setDate] = React.useState(
    `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(
      t.getDate()
    ).padStart(2, "0")}`
  );

  async function fetchRecords() {
    const rawRes = await fetch(
      pipeRecordsApiUrl + "?" + new URLSearchParams({ date }),
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          password,
          "is-client": true,
        },
      }
    );
    const res = await rawRes.json();
    res.variableRecord.forEach(
      ({ date, airHumidity, soilHumidity, temperature, light }) => {
        setDateLabels((array) => {
          return [formatDatetime(date), ...array];
        });
        setAirHumidityData((array) => [airHumidity, ...array]);
        setSoilHumidityData((array) => [soilHumidity, ...array]);
        setTemperatureData((array) => [temperature, ...array]);
        setLightData((array) => [light, ...array]);
      }
    );
    setProcessHistory(res.processRecord);
  }

  React.useEffect(() => {
    setDateLabels([]);
    setAirHumidityData([]);
    setSoilHumidityData([]);
    setTemperatureData([]);
    setLightData([]);
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  React.useEffect(() => {});

  return (
    <div className="PipeData">
      <div className="PipeData__timelapse">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="PipeData__timelapse__dateinput"
        />
      </div>
      <div className="PipeData__variabless">
        <VariableChart
          dateLabels={dateLabels}
          pipeData={airHumidityData}
          variable={"Humedad del aire (%)"}
          icon={airHumidityIcon}
          color="#4e0730"
        />
        <VariableChart
          dateLabels={dateLabels}
          pipeData={soilHumidityData}
          variable={"Humedad del suelo (%)"}
          icon={soilHumidityIcon}
          color="#0a3b6e"
        />
        <VariableChart
          dateLabels={dateLabels}
          pipeData={temperatureData}
          variable={"Temperatura (°C)"}
          icon={temperatureIcon}
          color="#0e3608"
        />
        <VariableChart
          dateLabels={dateLabels}
          pipeData={lightData}
          variable={"Luminosidad (%)"}
          icon={lightIcon}
          color="#4e4207"
        />
      </div>
      <div className="PipeData__process">
        <h2 className="PipeData__process__title">Historial de procesos</h2>
        {processHistory.map(
          ({ date, isBulbOn, isPumpOn, isFanOn, automation }, index) => (
            <Process
              date={formatDatetime(date, true)}
              isBulbOn={isBulbOn}
              isPumpOn={isPumpOn}
              isFanOn={isFanOn}
              automation={automation}
              key={`${date}${isBulbOn}${isPumpOn}${isFanOn}${automation}`}
              isTheLast={index === 0}
            />
          )
        )}
      </div>
    </div>
  );
}

export { PipeData };
