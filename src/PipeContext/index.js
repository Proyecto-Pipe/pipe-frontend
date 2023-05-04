import React from "react";

import {
  password,
  pipeRecordsApiUrl,
  pipeNowApiUrl,
  isClientOnlineUrl,
} from "../env.js";

const PipeContext = React.createContext();

function PipeProvider({ children }) {
  const [airHumidity, setAirHumidity] = React.useState(null);
  const [soilHumidity, setSoilHumidity] = React.useState(null);
  const [temperature, setTemperature] = React.useState(null);
  const [light, setLight] = React.useState(null);
  const [isBulbOn, setIsBulbOn] = React.useState(null);
  const [isFanOn, setIsFanOn] = React.useState(null);
  const [isPumpOn, setIsPumpOn] = React.useState(null);
  const [automation, setAutomation] = React.useState(null);
  const [lastPipeConnection, setLastPipeConnection] = React.useState(null);

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [update, setUpdate] = React.useState(true);
  const [silent, setSilent] = React.useState(false);

  function updateUi(variableRes, processRes) {
    if (variableRes.message === "No live pipe comunication") {
      return setError(400);
    } else {
      setError(false);
    }
    setAirHumidity(variableRes.airHumidity);
    setSoilHumidity(variableRes.soilHumidity);
    setTemperature(variableRes.temperature);
    setLight(variableRes.light);
    setIsBulbOn(processRes.isBulbOn);
    setIsFanOn(processRes.isFanOn);
    setIsPumpOn(processRes.isPumpOn);
    setAutomation(processRes.automation);
    setLastPipeConnection(variableRes.lastPipeConnection);
    if (
      !parseFloat(airHumidity) ||
      !parseFloat(soilHumidity) ||
      !parseFloat(temperature) ||
      !parseFloat(light)
    ) {
      if (airHumidity !== null) {
        setError(502); // Value not a float
      }
    }
  }

  async function fetchPostIsClientOnline() {
    console.log("fetchPostIsClientOnline");
    try {
      await fetch(isClientOnlineUrl, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          password,
          "is-client": true,
        },
      });
    } catch (err) {
      setLoading(false);
      setError(500);
    }
  }

  async function fetchGetPipeApi() {
    console.log("fetchGetPipeApi");
    try {
      if (!silent) setLoading(true);
      const rawVariableRes = await fetch(pipeNowApiUrl, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          password,
          "is-client": true,
        },
      });
      const rawProcessRes = await fetch(pipeRecordsApiUrl, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          password,
          "is-pipe": true,
        },
      });
      const variableRes = await rawVariableRes.json();
      const processRes = await rawProcessRes.json();
      if (variableRes.message === "No live pipe comunication") {
        setError(400);
      }
      if (!silent) setLoading(false);
      setSilent(false);
      if (variableRes.lastPipeConnection !== lastPipeConnection) {
        updateUi(variableRes, processRes);
      }
    } catch (err) {
      setLoading(false);
      setError(500);
    }
  }

  async function fetchPostPipeApi() {
    console.log("fetchPostPipeApi");
    try {
      setLoading(true);
      const body = JSON.stringify({
        isBulbOn: isBulbOn,
        isFanOn: isFanOn,
        isPumpOn: isPumpOn,
        automation: automation,
      });
      await fetch(pipeRecordsApiUrl, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          password,
          "is-client": true,
        },
        body: body,
      });
      setLoading(false);
      // updateUi(res);
    } catch (err) {
      setLoading(false);
      setError(500);
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      setSilent(true);
      setUpdate(true);
    }, 3000);
  }, []);

  React.useEffect(() => {
    if (update === false) return;
    fetchPostIsClientOnline();
    fetchGetPipeApi();
    setUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  React.useEffect(() => {
    if (
      isBulbOn !== null &&
      isFanOn !== null &&
      isPumpOn !== null &&
      automation !== null
    ) {
      fetchPostPipeApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBulbOn, isFanOn, isPumpOn, automation]);

  return (
    <PipeContext.Provider
      value={{
        airHumidity,
        soilHumidity,
        temperature,
        light,
        isBulbOn,
        isFanOn,
        isPumpOn,
        automation,
        setIsBulbOn,
        setIsFanOn,
        setIsPumpOn,
        setAutomation,
        lastPipeConnection,
        error,
        loading,
      }}
    >
      {children}
    </PipeContext.Provider>
  );
}

export { PipeProvider, PipeContext };
