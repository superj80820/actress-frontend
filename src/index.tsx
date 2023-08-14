import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import liff from "@line/liff";

const LIFF_ID = "1655529572-bv0kM39q";

document.addEventListener("DOMContentLoaded", function () {
  liff
    .init({ liffId: LIFF_ID })
    .then(() => {
      ReactDOM.render(
        <React.StrictMode>
          <App LiffId={LIFF_ID} />
        </React.StrictMode>,
        document.getElementById("root")
      );
    })
    .catch((err) => {
      console.error(err);
      alert("載入錯誤");
    });
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
