import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StarCard from "./components/StarCard";
import AdCard from "./components/AdCard";
import "./App.css";
import liff from "@line/liff";
import {
  favorite,
  addFavorite,
  verifyProfile,
  getFavorites,
  verifyProfileResponse,
  removeFavorite,
} from "./repository/liff-service";

import { star } from "./repository/face-service";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    flexGrow: 1,
  },
  card: {
    "flex-direction": "column",
  },
});

// yorkworkaround: 如果搜尋ID不存在需導到錯誤頁面
const urlQuery = new URLSearchParams(window.location.search);
const ID: string = urlQuery.get("ID") || "";
// yorkworkaround: 有時間在調成#的route
const urlRoute = urlQuery.get("route") || "search";

function App(prop: { LiffId: string }) {
  const [favorites, setFavorites] = useState<favorite[]>([]);
  const [route, setRoute] = useState(urlRoute);
  const [profile, setProfile] = useState<verifyProfileResponse>();

  const setFavoritesRouteByClick = async () => {
    setRoute("favorites");
    if (profile) {
      setFavorites(await getFavorites(profile.accountId));
    }
  };

  const setSerachRouteByClick = () => {
    setRoute("search");
  };

  const removeFavoriteButton = (faceId: string) => () => (
    <Button
      onClick={async () => {
        if (profile) {
          await removeFavorite(profile.accountId, faceId);
          setFavorites(await getFavorites(profile.accountId));
          alert("移除成功");
        }
      }}
      variant="outlined"
    >
      移除我心愛的女孩
    </Button>
  );

  const addFavoriteButton = (faceId: string) => () => (
    <Button
      onClick={async () => {
        if (profile) {
          await addFavorite(profile.accountId, faceId);
          alert("加入成功");
        }
      }}
      variant="outlined"
    >
      加入我心愛的女孩
    </Button>
  );

  useEffect(() => {
    (async () => {
      const liffAccessToken = liff.getAccessToken();
      if (liffAccessToken !== null) {
        const profile = await verifyProfile(liffAccessToken, prop.LiffId);
        setProfile(profile);
        setFavorites(await getFavorites(profile.accountId));
      }
    })();
  }, [prop]);

  const classes = useStyles();
  return (
    <div className="App">
      {profile ? (
        <>
          <AppBar
            position="fixed"
            style={{ color: "#000000", background: "#ffffff" }}
          >
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {route === "search"
                  ? "搜尋結果"
                  : route === "favorites"
                  ? "我心愛的女孩"
                  : ""}
              </Typography>
              {ID !== "" ? (
                <Button onClick={() => setSerachRouteByClick()} color="inherit">
                  搜尋結果
                </Button>
              ) : (
                <></>
              )}
              <Button
                onClick={() => setFavoritesRouteByClick()}
                color="inherit"
              >
                我心愛的女孩
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.root} style={{ padding: "60px" }}>
            <div className={classes.card}>
              <AdCard></AdCard>
              {route === "search" && profile ? (
                <>
                  <StarCard
                    Profile={profile}
                    ID={ID}
                    FavoriteButton={addFavoriteButton(ID)}
                  ></StarCard>
                </>
              ) : route === "favorites" && profile ? (
                <>
                  {favorites.map((item) => (
                    <StarCard
                      Profile={profile}
                      Star={
                        {
                          id: item.id,
                          image: item.preview,
                          name: item.name,
                          detail: item.detail,
                        } as star
                      }
                      FavoriteButton={removeFavoriteButton(item.id.toString())}
                    ></StarCard>
                  ))}
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>目前僅支持在Line上使用{profile}</div>
      )}
    </div>
  );
}

export default App;
