import React from "react";

import env from "react-dotenv";

import "./App.css";

// Provider
import { PipeProvider } from "../../PipeContext";
import { ViewsProvider } from "../../ViewsContext";

// Components
import { Header } from "../Header";
import { ViewRenderer } from "../ViewRenderer";
import { Footer } from "../Footer/Footer";

function App() {
  return (
    <PipeProvider password={env.PASSWORD}>
      {/* <PipeProvider password={329}> */}
      <div className="UI">
        <div className="App">
          <ViewsProvider>
            <Header />
            <ViewRenderer />
          </ViewsProvider>
          <Footer />
        </div>
      </div>
    </PipeProvider>
  );
}

export { App };
