import React from "react";

import "./App.css";

// Provider
import { PipeProvider } from "../../PipeContext";
import { ViewsProvider } from "../../ViewsContext";

// Components
import { Header } from "../Header";
import { ViewRenderer } from "../ViewRenderer";
import { Footer } from "../Footer/Footer";

const pipeRecordsApiUrl = "https://pipe-server.herokuapp.com/v1/piperecords";
const pipeNowApiUrl = "https://pipe-server.herokuapp.com/v1/pipenow";
const isClientOnlineUrl = "https://pipe-server.herokuapp.com/v1/isclientonline";

function App() {
  return (
    <PipeProvider
      password={3124315}
      pipeRecordsApiUrl={pipeRecordsApiUrl}
      pipeNowApiUrl={pipeNowApiUrl}
      isClientOnlineUrl={isClientOnlineUrl}
    >
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
