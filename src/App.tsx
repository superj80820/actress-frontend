import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarCard from "./components/StarCard";
import AdCard from "./components/AdCard";
import AppBar from "./components/AppBar";
import "./App.css";
import liff from "@line/liff";
import getProfile from "./repository/liff-service";

const LIFF_ID = "1654274121-b5mVv5gE";

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
  liff.init({ liffId: LIFF_ID }).then(async () => {
    const liffAccessToken = liff.getAccessToken();
    if (liffAccessToken !== null) {
      await getProfile(liffAccessToken, LIFF_ID);
    }
  });

  const classes = useStyles();
  return (
    <div className="App">
      <AppBar></AppBar>
      <div className={classes.root} style={{ padding: "60px" }}>
        <div className={classes.card}>
          <AdCard></AdCard>
          <StarCard ID={ID}></StarCard>
        </div>
      </div>
    </div>
  );
}

export default App;
