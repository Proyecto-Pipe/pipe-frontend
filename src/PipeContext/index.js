import React from "react";

// const pipeApiUrl = "https://pipe-server.herokuapp.com/v1/pipe";
const pipeApiUrl = "http://localhost:5000/v1/pipe";

const PipeContext = React.createContext();

function PipeProvider({ children, password }) {
  const [humidity, setHumidity] = React.useState(100);
  const [temperature, setTemperature] = React.useState(13);
  const [light, setLight] = React.useState(100);
  const [isBulbOn, setIsBulbOn] = React.useState(1);
  const [isPumpOn, setIsPumpOn] = React.useState(null);
  const [lastPipeConnection, setLastPipeConnection] = React.useState(null);

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [update, setUpdate] = React.useState(true);

  function updateUi(res) {
    console.log(res);
    if (res.message === "No pipe comunication") return setError(400);
    else setError(false);
    setHumidity(res.humidity);
    setTemperature(res.temperature);
    setLight(res.light);
    setIsBulbOn(res.isBulbOn);
    setIsPumpOn(res.isPumpOn);
    setLastPipeConnection(res.lastPipeConnection);
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
    console.log("A");
    try {
      setLoading(true);
      const body = {
        humidity: humidity,
        temperature: temperature,
        light: light,
        isBulbOn: isBulbOn,
        isPumpOn: isPumpOn,
        // isClient: true,
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
  }, [update]);

  function toggleBulb() {
    setIsBulbOn(!isBulbOn);
    fetchPostPipeApi();
  }

  function togglePump() {
    setIsPumpOn(!isPumpOn);
    fetchPostPipeApi();
  }

  return (
    <PipeContext.Provider
      value={{
        humidity,
        temperature,
        light,
        isBulbOn,
        isPumpOn,
        lastPipeConnection,
        setUpdate,
        error,
        loading,
        toggleBulb,
        togglePump,
      }}
    >
      {children}
    </PipeContext.Provider>
  );
}

export { PipeProvider, PipeContext };
