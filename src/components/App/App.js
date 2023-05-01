import React from "react";

import "./App.css";

// Provider
import { ViewsProvider } from "../../ViewsContext";

// Components
import { Header } from "../Header";
import { ViewRenderer } from "../ViewRenderer";
import { Footer } from "../Footer/Footer";

function App() {
  return (
    <div className="UI">
      <div className="background">
        <div className="App">
          <ViewsProvider>
            <Header />
            <ViewRenderer />
          </ViewsProvider>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export { App };
