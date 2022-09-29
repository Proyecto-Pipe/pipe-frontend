import React from "react";

import { ViewsContext } from "./index.js";

import "./ViewManager.css";

function ViewRenderer(views, currentViewIndex) {
  return views[currentViewIndex].view;
}

function ViewManager() {
  const { views, currentViewIndex, setCurrentViewIndex } =
    React.useContext(ViewsContext);

  function Arrow({ left }) {
    const onClick = () => {
      if (left) {
        setCurrentViewIndex(currentViewIndex - 1);
      } else {
        setCurrentViewIndex(currentViewIndex + 1);
      }
    };
    return (
      <button className="Arrow" onClick={onClick}>
        {left ? "<" : ">"}
      </button>
    );
  }

  return (
    <div className="ViewManager">
      {currentViewIndex !== 0 ? <Arrow left={true} /> : <div></div>}
      <p>{views[currentViewIndex].name}</p>
      {currentViewIndex !== views.length - 1 ? (
        <Arrow left={false} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export { ViewManager, ViewRenderer };
