import React from "react";

import "./App.css";

// Components
import { Header } from "../Header";
import { PipeData } from "../PipeData";

function App() {
  return (
    <div className="App">
      <Header />
      <PipeData />
    </div>
  );
}

export { App };
