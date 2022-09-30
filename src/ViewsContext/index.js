import React from "react";

import { WhatIsPipe } from "../components/WhatIsPipe";
import { PipeData } from "../components/PipeData";

const ViewsContext = React.createContext();

function ViewsProvider({ children }) {
  const [views] = React.useState([
    { name: "¿Qué es P.I.P.E.?", view: <WhatIsPipe /> },
    { name: "Estado actual invernadero", view: <PipeData /> },
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
