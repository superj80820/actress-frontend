import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarCard from "./components/StarCard";
import AdCard from "./components/AdCard";
import AppBar from "./components/AppBar";
import GoogleAd from "./components/GoogleAd";
import "./App.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    "flex-direction": "column",
  },
});

const LIFFQuerys: { [ID: string]: string } = ((liffState) =>
  liffState !== null
    ? liffState
        .replace("?", "")
        .replace("/", "")
        .split("&")
        .reduce(
          (a, b) => ({
            ...a,
            ...(([key, value]) => ({
              [key]: value,
            }))(b.split("=")),
          }),
          {}
        )
    : {})(new URLSearchParams(window.location.search).get("liff.state"));

// Workaround: 如果搜尋ID不存在需導到錯誤頁面
const ID: string = LIFFQuerys.ID || "1";

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar></AppBar>
      <div className={classes.root} style={{ padding: "60px" }}>
        <div className={classes.card}>
          <AdCard></AdCard>
          <StarCard ID={ID}></StarCard>
          <GoogleAd></GoogleAd>
        </div>
      </div>
    </div>
  );
}

export default App;
