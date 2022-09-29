import React from "react";

import { PipeData } from "../components/PipeData";

const ViewsContext = React.createContext();

function ViewsProvider({ children }) {
  const [views] = React.useState([
    { name: "Current State", view: <PipeData /> },
    { name: "What's P.I.P.E.", view: <p>GOASL</p> },
  ]);
  const [currentViewIndex, setCurrentViewIndex] = React.useState(0);

  return (
    <ViewsContext.Provider
      value={{ views, currentViewIndex, setCurrentViewIndex }}
    >
      {children}
    </ViewsContext.Provider>
  );
}

export { ViewsProvider, ViewsContext };
