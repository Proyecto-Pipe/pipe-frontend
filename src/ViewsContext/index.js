import React from "react";

import { PipeData } from "../components/PipeData";

console.log("Creating context");
const ViewsContext = React.createContext();

function ViewsProvider({ children }) {
  const [views] = React.useState([
    { name: "Current State", view: <PipeData /> },
    // { name: "Current State", view: <p>VISTA 1</p> },
    { name: "What's P.I.P.E.", view: <p>VISTA 2</p> },
  ]);
  const [currentViewIndex, setCurrentViewIndex] = React.useState(0);
  console.log("SOY EL PROVIDER");
  return (
    <ViewsContext.Provider
      value={{ views, currentViewIndex, setCurrentViewIndex }}
    >
      {children}
    </ViewsContext.Provider>
  );
}

export { ViewsProvider, ViewsContext };
