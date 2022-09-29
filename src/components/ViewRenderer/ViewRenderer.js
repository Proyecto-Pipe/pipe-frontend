import React from "react";

import { ViewsContext } from "../../ViewsContext";

function ViewRenderer() {
  const { views, currentViewIndex } = React.useContext(ViewsContext);

  return <div>{views[currentViewIndex].view}</div>;
}

export { ViewRenderer };
