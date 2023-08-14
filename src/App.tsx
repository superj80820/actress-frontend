import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import StarCard from "./components/StarCard";
import AdCard from "./components/AdCard";
import DonateCard from "./components/DonateCard";
import Carousel from "./mixs/Carousel";
import Cookies from "universal-cookie";
import LoginCard from "./components/LoginCard";
import "./App.css";
import liff from "@line/liff";
import {
  favorite,
  addFavorite,
  getFavorites,
  removeFavorite,
} from "./repository/liff-service";

import {
  verifyLIFF,
  verifyTelegramCode,
  verifyLineCode,
  verifyDiscordCode,
} from "./repository/auth-service";

import { star } from "./repository/face-service";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      sizeLarge: {
        padding: "8px 25px",
      },
    },
  },
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    "flex-direction": "column",
  },
});

// yorkworkaround: 如果搜尋ID不存在需導到錯誤頁面
const urlQuery = new URLSearchParams(window.location.search);

const Code: string = urlQuery.get("code") || "";
const ActressIDInLiff: string = urlQuery.get("ID") || "";
const Platform: string = urlQuery.get("platform") || "";
// yorkworkaround: 有時間在調成#的route
const urlRoute = urlQuery.get("route") || "search";

const cookies = new Cookies();

function App(prop: { LiffId: string }) {
  const [favorites, setFavorites] = useState<favorite[]>([]);
  const [route, setRoute] = useState(urlRoute);
  const [actressID, setActressID] = useState<string>("");
  const [token, setToken] = useState<string>(cookies.get("token"));

  const setFavoritesRouteByClick = async () => {
    setRoute("favorites");
    if (token) {
      isCurrentTokenExpire();
      setFavorites(await getFavorites(token));
    }
  };

  const setSerachRouteByClick = () => {
    setRoute("search");
  };

  const setTokenAndCookie = (token: string) => {
    setToken(token);
    cookies.set("token", token);
  };

  const removeFavoriteButton = (faceId: string) => () => {
    return (
      <Button
        onClick={async () => {
          if (token) {
            isCurrentTokenExpire();
            await removeFavorite(token, faceId);
            setFavorites(await getFavorites(token));
            alert("移除成功");
          }
        }}
        variant="outlined"
      >
        移除我心愛的女孩
      </Button>
    );
  };

  const addFavoriteButton = (faceId: string) => () => {
    return (
      <Button
        onClick={async () => {
          if (token) {
            isCurrentTokenExpire();
            await addFavorite(token, faceId);
            alert("加入成功");
          }
        }}
        variant="outlined"
      >
        加入我心愛的女孩
      </Button>
    );
  };

  // 如果token過期就回到主頁面
  const isCurrentTokenExpire = () => {
    const currentToken = cookies.get("token");
    if (currentToken) {
      const exp = JSON.parse(atob(currentToken.split(".")[1])).exp;
      if (Math.floor(Date.now() / 1000) > exp) {
        window.alert("登入過期，請重新登入");
        cookies.remove("token");
        window.location.replace(
          `${window.location.origin}?ID=${cookies.get("actressID")}`
        );
      }
    }
  };

  const lineCodeHandler = useCallback(async () => {
    let currentToken = token;
    if (!currentToken) {
      const response = await verifyLineCode(
        Code,
        `${window.location.origin}?ID=${cookies.get("actressID")}`
      );
      setTokenAndCookie(response.token);
    }
    setActressID(cookies.get("actressID"));
    setFavorites(await getFavorites(currentToken));
  }, [token]);

  const discordCodeHandler = useCallback(async () => {
    let currentToken = token;
    if (!currentToken) {
      const response = await verifyDiscordCode(
        Code,
        `${window.location.origin}/?platform=discord`
      );
      setTokenAndCookie(response.token);
    }
    setActressID(cookies.get("actressID"));
    setFavorites(await getFavorites(currentToken));
  }, [token]);

  const telegramCodeHandler = useCallback(async () => {
    let currentToken = token;
    if (!currentToken) {
      const response = await verifyTelegramCode(Code);
      setTokenAndCookie(response.token);
    }
    setActressID(cookies.get("actressID"));
    setFavorites(await getFavorites(currentToken));
  }, [token]);

  useEffect(() => {
    (async () => {
      isCurrentTokenExpire();

      const liffAccessToken = liff.getAccessToken();
      if (liffAccessToken !== null) {
        const response = await verifyLIFF(liffAccessToken, prop.LiffId);
        setTokenAndCookie(response.token);
        setFavorites(await getFavorites(response.token));
        setActressID(ActressIDInLiff);
      } else if (Code !== "") {
        switch (Platform) {
          case "line":
            await lineCodeHandler();
            break;
          case "discord":
            await discordCodeHandler();
            break;
          case "telegram":
            await telegramCodeHandler();
            break;
          default:
            await lineCodeHandler();
        }
      } else {
        const id =
          window.location.search.match(/ID%3D([0-9]+)/)?.[1] ||
          window.location.search.match(/ID=([0-9]+)/)?.[1] ||
          cookies.get("actressID");
        if (!id) {
          return;
        }
        setActressID(id);
        cookies.set("actressID", id);
      }
    })();
  }, [discordCodeHandler, lineCodeHandler, telegramCodeHandler, prop]);

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Grid container className={classes.root} spacing={2}>
          {token ? (
            <>
              <AppBar
                position="fixed"
                style={{ color: "#000000", background: "#ffffff" }}
              >
                <Toolbar>
                  {actressID !== "" ? (
                    <Button
                      style={{
                        color: route === "search" ? red[200] : "#000000",
                      }}
                      onClick={() => setSerachRouteByClick()}
                      color="inherit"
                    >
                      搜尋結果
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Button
                    style={{
                      color: route === "favorites" ? red[200] : "#000000",
                    }}
                    onClick={() => setFavoritesRouteByClick()}
                    color="inherit"
                  >
                    我心愛的女孩
                  </Button>
                </Toolbar>
              </AppBar>
              <div className={classes.root} style={{ padding: "60px" }}>
                <div className={classes.card}>
                  &nbsp;
                  {Carousel({
                    array: [
                      <AdCard></AdCard>,
                      <DonateCard
                        img="https://imgur.com/22UQJUU.png"
                        bankName="Line Bank"
                        bankInfo="(824)111012580847"
                      ></DonateCard>,
                      <DonateCard
                        img="https://imgur.com/3ftbKKP.png"
                        bankName="街口支付"
                        bankInfo="(396)906114476"
                      ></DonateCard>,
                      <DonateCard
                        img="https://imgur.com/9sVYLSn.png"
                        bankName="國泰銀行"
                        bankInfo="(013)204506227890"
                      ></DonateCard>,
                    ],
                    width: "250px",
                    height: "450px",
                  })}
                  {route === "search" && token ? (
                    <>
                      {Carousel({
                        array: [
                          <StarCard
                            Token={token}
                            ID={actressID}
                            FavoriteButton={addFavoriteButton(actressID)}
                          ></StarCard>,
                        ],
                        width: "345px",
                        height: "540px",
                      })}
                    </>
                  ) : route === "favorites" && token ? (
                    <>
                      {Carousel({
                        array: favorites.map((item) => (
                          <StarCard
                            Token={token}
                            Star={
                              {
                                id: item.id,
                                image: item.preview,
                                name: item.name,
                                detail: item.detail,
                              } as star
                            }
                            FavoriteButton={removeFavoriteButton(
                              item.id.toString()
                            )}
                            maxWidth={270}
                          ></StarCard>
                        )),
                        width: "270px",
                        height: "540px",
                      })}
                    </>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </>
          ) : actressID ? (
            <div style={{ padding: "60px" }}>
              <LoginCard ActressID={actressID}></LoginCard>
            </div>
          ) : (
            <div></div>
          )}
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
