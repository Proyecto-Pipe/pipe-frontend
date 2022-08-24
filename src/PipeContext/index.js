import React from "react";

const PipeContext = React.createContext();

function PipeProvider({ children }) {
  const [humidity, setHumidity] = React.useState(100);
  const [temperature, setTemperature] = React.useState(13);
  const [light, setLight] = React.useState(100);
  const [isBulbOn, setIsBulbOn] = React.useState(1);
  const [isPumpOn, setIsPumpOn] = React.useState(null);
  const [lastPipeConnection, setLastPipeConnection] = React.useState(null);

  const [loading, setLoading] = React.useState(true);
  const [update, setUpdate] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (update === false) return;
    setUpdate(false);
    console.log("upd");
  }, [update]);

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
        loading,
      }}
    >
      {children}
    </PipeContext.Provider>
  );
}

export { PipeProvider, PipeContext };
