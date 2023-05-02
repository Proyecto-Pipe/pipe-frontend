import React from "react";

import { WhatIsPipe } from "../components/WhatIsPipe";
import { PipeNow } from "../components/PipeNow";
import { PipeData } from "../components/PipeData";
import { MoreResources } from "../components/MoreResources";

const ViewsContext = React.createContext();

function ViewsProvider({ children }) {
  const [views] = React.useState([
    { name: "Historial de estado PIPE", view: <PipeData /> },
    { name: "¿Qué es PIPE?", view: <WhatIsPipe /> },
    { name: "Estado actual de PIPE", view: <PipeNow /> },
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
