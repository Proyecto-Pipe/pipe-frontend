import React from "react";

import { WhatIsPipe } from "../components/WhatIsPipe";
import { PipeNow } from "../components/PipeNow";
import { PipeData } from "../components/PipeData";
import { MoreResources } from "../components/MoreResources";

const ViewsContext = React.createContext();

function ViewsProvider({ children }) {
  const [views] = React.useState([
    { name: "¿Qué es P.I.P.E.?", view: <WhatIsPipe /> },
    { name: "Estado actual invernadero", view: <PipeNow /> },
    { name: "Historial de estado invernadero", view: <PipeData /> },
    { name: "Más recursos", view: <MoreResources /> },
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
