import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import VConsole from 'vconsole';

if (!process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === "development") {
  new VConsole({ theme: 'dark' })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
