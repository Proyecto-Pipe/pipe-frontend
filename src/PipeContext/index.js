import React from "react";

import {
  password,
  pipeRecordsApiUrl,
  pipeNowApiUrl,
  isClientOnlineUrl,
  isUserCodeValidUrl,
} from "../env.js";

import { useLocalStorage } from "../useLocalStorage.js";

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

  const [isUserCodeValid, setIsUserCodeValid] = React.useState(false);
  const [loadingIsUserCodeValid, setLoadingIsUserCodeValid] =
    React.useState(false);
  const [displayInsertUserCode, setDisplayInsertUserCode] =
    React.useState(false);
  const {
    item: userCode,
    saveItem: saveUserCode,
    loading: loadingUserCode,
    // eslint-disable-next-line no-unused-vars
    error: errorUserCode,
  } = useLocalStorage("PIPE_USER_CODE_V1", undefined);

  function updateUi(data) {
    if (data.message === "No live pipe comunication") {
      return setError(400);
    } else {
      setError(false);
    }
    setAirHumidity(data.airHumidity);
    setSoilHumidity(data.soilHumidity);
    setTemperature(data.temperature);
    setLight(data.light);
    setIsBulbOn(data.isBulbOn);
    setIsFanOn(data.isFanOn);
    setIsPumpOn(data.isPumpOn);
    setAutomation(data.automation);
    setLastPipeConnection(data.lastPipeConnection);
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
      const rawData = await fetch(pipeNowApiUrl, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          password,
          "is-client": true,
        },
      });
      const data = await rawData.json();
      if (data.message === "No live pipe comunication") {
        setError(400);
      }
      if (!silent) setLoading(false);
      setSilent(false);
      if (data.lastPipeConnection !== lastPipeConnection) {
        updateUi(data);
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
      const res = await fetch(pipeRecordsApiUrl, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          password,
          "is-client": true,
          "user-code": userCode,
        },
        body: body,
      });
      setLoading(false);
      if (res.status === 403) {
        setDisplayInsertUserCode(true);
      }
    } catch (err) {
      setLoading(false);
      setError(500);
    }
  }

  async function checkIfUserCodeIsValid() {
    console.log("checkIfUserCodeIsValid");
    setLoadingIsUserCodeValid(true);
    const rawRes = await fetch(isUserCodeValidUrl, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        password,
        "is-client": true,
        "user-code": userCode,
      },
    });
    const res = await rawRes.json();
    if (res.message === "User code invalid") {
      setIsUserCodeValid(false);
    } else if (res.message === "User code valid") {
      setIsUserCodeValid(true);
    }
    setLoadingIsUserCodeValid(false);
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
      automation !== null &&
      isUserCodeValid === true
    ) {
      fetchPostPipeApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBulbOn, isFanOn, isPumpOn, automation]);

  React.useEffect(() => {
    checkIfUserCodeIsValid();
    if (isUserCodeValid === true) {
      setDisplayInsertUserCode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCode, isUserCodeValid]);

  React.useEffect(() => {
    if (loadingUserCode === false) {
      checkIfUserCodeIsValid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUserCode]);

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
        userCode,
        saveUserCode,
        isUserCodeValid,
        displayInsertUserCode,
        setDisplayInsertUserCode,
        loadingIsUserCodeValid,
      }}
    >
      {children}
    </PipeContext.Provider>
  );
}

export { PipeProvider, PipeContext };
