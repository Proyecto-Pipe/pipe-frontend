import React from "react";

import env from "react-dotenv";

import "./App.css";

// Provider
import { PipeProvider } from "../../PipeContext";

// Components
import { Header } from "../Header";
import { PipeData } from "../PipeData";

function App() {
  return (
    <PipeProvider password={env.PASSWORD}>
      <div className="App">
        <Header />
        <PipeData />
      </div>
    </PipeProvider>
  );
}

export { App };
