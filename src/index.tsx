import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/global.scss";

import { CountdownProvider } from "./contexts/CountdownContext";

ReactDOM.render(
  <React.StrictMode>
    <CountdownProvider>
      <App />
    </CountdownProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
