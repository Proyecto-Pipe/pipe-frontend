import React from "react";

import "./App.css";

// Provider
import { PipeProvider } from "../../PipeContext";

// Components
import { Header } from "../Header";
import { PipeData } from "../PipeData";

function App() {
  return (
    <PipeProvider>
      <div className="App">
        <Header />
        <PipeData />
      </div>
    </PipeProvider>
  );
}

export { App };
