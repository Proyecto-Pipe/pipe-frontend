import React from "react";
// https://www.chartjs.org/docs/latest/charts/line.html
// https://www.chartjs.org/docs/latest/getting-started/usage.html
import { VariableChart } from "./VariableChart";
import "./PipeData.css";

import { PipeContext } from "../../PipeContext";

function PipeData() {
  const { pipeRecordsApiUrl, password } = React.useContext(PipeContext);
  const [dateLabels, setDateLabels] = React.useState([]);
  const [airHumidityData, setAirHumidityData] = React.useState([]);
  const [soilHumidityData, setSoilHumidityData] = React.useState([]);
  const [temperatureData, setTemperatureData] = React.useState([]);
  const [lightData, setLightData] = React.useState([]);

  async function fetchRecords() {
    const rawRes = await fetch(pipeRecordsApiUrl, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        password,
        "is-client": true,
      },
    });
    const res = await rawRes.json();
    res.variableRecord.map(
      // ({ date, airHumidity, soilHumidity, temperature, light }) => {
      (record) => {
        console.log(record.date);
        setDateLabels((dateLabels) => [...dateLabels, record.date]);
        // dateLabels.push(record.date);
        setAirHumidityData([...airHumidityData, record.airHumidity]);
        setSoilHumidityData([...soilHumidityData, record.soilHumidity]);
        setTemperatureData([...temperatureData, record.temperature]);
        setLightData([...lightData, record.light]);
      }
    );
  }

  React.useEffect(() => {
    console.log(dateLabels);
  }, [dateLabels]);

  React.useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="PipeData">
      <div className="PipeData__timelapse"></div>
      <div className="PipeData__variabless">
        <VariableChart />
      </div>
      <div className="PipeData__process"></div>
    </div>
  );
}

export { PipeData };
