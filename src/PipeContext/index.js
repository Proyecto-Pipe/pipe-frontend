import React from "react";

const pipeApiUrl = "https://pipe-server.herokuapp.com/v1/pipe";
// const pipeApiUrl = "http://localhost:5000/v1/pipe";

const PipeContext = React.createContext();

function PipeProvider({ children, password }) {
  const [airHumidity, setAirHumidity] = React.useState(null);
  const [soilHumidity, setSoilHumidity] = React.useState(null);
  const [temperature, setTemperature] = React.useState(null);
  const [light, setLight] = React.useState(null);
  const [isBulbOn, setIsBulbOn] = React.useState(0);
  const [isFanOn, setIsFanOn] = React.useState(0);
  const [isPumpOn, setIsPumpOn] = React.useState(0);
  const [lastPipeConnection, setLastPipeConnection] = React.useState(null);

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [update, setUpdate] = React.useState(true);
  const [silent, setSilent] = React.useState(false);

  function updateUi(res) {
    if (res.message === "No pipe comunication") return setError(400);
    else setError(false);
    setAirHumidity(res.airHumidity);
    setSoilHumidity(res.soilHumidity);
    setTemperature(res.temperature);
    setLight(res.light);
    setLastPipeConnection(res.lastPipeConnection);
    if (
      !parseFloat(airHumidity) ||
      !parseFloat(soilHumidity) ||
      !parseFloat(temperature) ||
      !parseFloat(light)
    ) {
      setError(502); // Value not a float
    }
  }

  async function fetchGetPipeApi() {
    try {
      if (!silent) setLoading(true);
      const rawRes = await fetch(pipeApiUrl, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          password: password,
          "is-client": true,
        },
      });
      const res = await rawRes.json();
      if (!silent) setLoading(false);
      setSilent(false);
      if (res.lastPipeConnection !== lastPipeConnection) {
        updateUi(res);
      }
    } catch (err) {
      setLoading(false);
      setError(500);
    }
  }

  async function fetchPostPipeApi() {
    try {
      setLoading(true);
      const body = JSON.stringify({
        isBulbOn: isBulbOn,
        isFanOn: isFanOn,
        isPumpOn: isPumpOn,
      });
      const rawRes = await fetch(pipeApiUrl, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          password: password,
          "is-client": true,
        },
        body: body,
      });
      const res = await rawRes.json();
      setLoading(false);
      // updateUi(res);
    } catch (err) {
      setLoading(false);
      setError(500);
    }
  }

  React.useEffect(() => {
    if (update === false) return;
    fetchGetPipeApi();
    setUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  React.useEffect(() => {
    setInterval(() => {
      setSilent(true);
      setUpdate(true);
    }, 2000);
  }, []);

  React.useEffect(() => {
    fetchPostPipeApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBulbOn, isFanOn, isPumpOn]);

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
        setIsBulbOn,
        setIsFanOn,
        setIsPumpOn,
        lastPipeConnection,
        setUpdate,
        error,
        loading,
      }}
    >
      {children}
    </PipeContext.Provider>
  );
}

export { PipeProvider, PipeContext };
