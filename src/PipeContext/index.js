import React from "react";

const pipeApiUrl = "https://pipe-server.herokuapp.com/v1/pipe";
// const pipeApiUrl = "http://localhost:5000/v1/pipe";

const PipeContext = React.createContext();

function PipeProvider({ children, password }) {
  const [airHumidity, setAirHumidity] = React.useState(null);
  const [soilHumidity, setSoilHumidity] = React.useState(null);
  const [temperature, setTemperature] = React.useState(null);
  const [light, setLight] = React.useState(null);
  const [isBulbOn, setIsBulbOn] = React.useState(null);
  const [isFanOn, setIsFanOn] = React.useState(null);
  const [isPumpOn, setIsPumpOn] = React.useState(null);
  const [lastPipeConnection, setLastPipeConnection] = React.useState(null);

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [update, setUpdate] = React.useState(true);

  function updateUi(res) {
    if (res.message === "No pipe comunication") return setError(400);
    else setError(false);
    setAirHumidity(res.airHumidity);
    setSoilHumidity(res.soilHumidity);
    setTemperature(res.temperature);
    setLight(res.light);
    setIsBulbOn(res.isBulbOn);
    setIsFanOn(res.isFanOn);
    setIsPumpOn(res.isPumpOn);
    setLastPipeConnection(res.lastPipeConnection);
    if (
      !parseFloat(airHumidity) ||
      !parseFloat(soilHumidity) ||
      !parseFloat(temperature) ||
      !parseFloat(light)
    ) {
      console.log("Some value is not a float");
      setError(502); // Value not a float
    }
  }

  async function fetchGetPipeApi() {
    try {
      setLoading(true);
      const rawRes = await fetch(pipeApiUrl, {
        method: "GET",
        headers: { "Access-Control-Allow-Origin": "*", password: password },
      });
      setLoading(false);
      const res = await rawRes.json();
      updateUi(res);
    } catch (err) {
      setLoading(false);
      setError(500);
    }
  }

  async function fetchPostPipeApi() {
    try {
      setLoading(true);
      const body = {
        airHumidity: airHumidity,
        soilHumidity: soilHumidity,
        temperature: temperature,
        light: light,
        isBulbOn: isBulbOn,
        isFanOn: isFanOn,
        isPumpOn: isPumpOn,
        isClient: true,
      };
      const rawRes = await fetch(pipeApiUrl, {
        method: "POST",
        headers: { "Access-Control-Allow-Origin": "*", password: password },
        body: JSON.stringify(body),
      });
      setLoading(false);
      const res = await rawRes.json();
      updateUi(res);
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

  function toggleBulb() {
    setIsBulbOn(!isBulbOn);
    fetchPostPipeApi();
  }

  function toggleFan() {
    setIsFanOn(!isFanOn);
    fetchPostPipeApi();
  }

  function togglePump() {
    setIsPumpOn(!isPumpOn);
    fetchPostPipeApi();
  }

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
        lastPipeConnection,
        setUpdate,
        error,
        loading,
        toggleBulb,
        toggleFan,
        togglePump,
      }}
    >
      {children}
    </PipeContext.Provider>
  );
}

export { PipeProvider, PipeContext };
