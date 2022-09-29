import React from "react";

import env from "react-dotenv";

import "./App.css";

// Provider
import { PipeProvider } from "../../PipeContext";
import { ViewRenderer } from "../../ViewsContext/ViewManager.js";
import { ViewsContext, ViewsProvider } from "../../ViewsContext";

// Components
import { Header } from "../Header";
import { Footer } from "../Footer/Footer";

function App() {
  const { views, currentViewIndex } = React.useContext(ViewsContext);

  return (
    <PipeProvider password={env.PASSWORD}>
      <ViewsProvider>
        <div className="UI">
          <div className="App">
            <Header />
            <ViewRenderer views={views} currentViewIndex={currentViewIndex} />
            <Footer />
          </div>
        </div>
      </ViewsProvider>
    </PipeProvider>
  );
}

export { App };
