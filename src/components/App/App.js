import React from "react";

import env from "react-dotenv";

import "./App.css";

// Provider
import { PipeProvider } from "../../PipeContext";

// Components
import { Header } from "../Header";
import { PipeData } from "../PipeData";
import { Footer } from "../Footer/Footer";

function App() {
  return (
    <PipeProvider password={env.PASSWORD}>
      <div className="UI">
        <div className="App">
          <Header />
          <PipeData />
          <Footer />
        </div>
      </div>
    </PipeProvider>
  );
}

export { App };
