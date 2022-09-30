import React from "react";

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
    <PipeProvider password={329}>
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
