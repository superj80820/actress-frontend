import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, AuthContextInterface } from './AuthContext';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      color: "#000000",
      background: "#ffffff"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function Bar() {
  const classes = useStyles();
  const navigate = useNavigate()
  const location = useLocation()
  const { token, setTokenWithCookie, platform } = useAuth() as AuthContextInterface;
  const messfarAvatar = (
    <Avatar>
      <img
        src={process.env.PUBLIC_URL + '/images/messfar_icon.jpg'}
        alt="messfar icon"
        style={{
          width: "130%",
          position: "relative",
          right: "5px",
        }}
      />
    </Avatar>
  );
  const githubAvatar = (
    <Avatar>
      <img
        src={process.env.PUBLIC_URL + '/images/github_icon.png'}
        alt="github icon"
        style={{
          width: "100%",
          position: "relative",
          background: "#FFFFFF"
        }}
      />
    </Avatar>
  );

  const facebookAvatar = (
    <Avatar>
      <img
        src={process.env.PUBLIC_URL + '/images/facebook_icon.svg'}
        alt="facebook icon"
        style={{
          width: "100%",
          position: "relative",
          background: "#FFFFFF"
        }}
      />
    </Avatar>
  );

  const lineAvatar = (
    <Avatar>
      <img
        src={process.env.PUBLIC_URL + '/images/line_icon.png'}
        alt="facebook icon"
        style={{
          width: "100%",
          position: "relative",
          background: "#FFFFFF"
        }}
      />
    </Avatar>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <Typography align="left" variant="h6" className={classes.title}>
            <Button
              color="inherit"
              onClick={() => navigate("/")}
            >
              {messfarAvatar}
            </Button>

          </Typography>
          {token.rawData !== "" ? (<Button
            style={{
              color: location.pathname === "/imageSearch" ? red[200] : "#000000",
            }}
            onClick={() => navigate("/imageSearch")}
            color="inherit"
          >
            圖片搜尋
          </Button>) : (
            <></>
          )}
          {token.rawData !== "" ? (<Button
            style={{
              color: location.pathname === "/nameSearch" ? red[200] : "#000000",
            }}
            onClick={() => navigate("/nameSearch")}
            color="inherit"
          >
            姓名搜尋
          </Button>) : (
            <></>
          )}
          {token.rawData !== "" ? (<Button
            style={{
              color: location.pathname === "/favorite" ? red[200] : "#000000",
            }}
            onClick={() => navigate("/favorite")}
            color="inherit"
          >
            我心愛的女孩
          </Button>) : (
            <></>
          )}
          {token.rawData !== "" && platform !== "liff" ? (<Button
            onClick={() => {
              setTokenWithCookie("")
              navigate("/")
            }}
            color="inherit"
          >
            登出
          </Button>) : (
            <></>
          )}
          <Button
            onClick={() => {
              window.location.replace("https://www.facebook.com/line.messfar")
            }}
            color="inherit"
          >
            {facebookAvatar}
          </Button>
          <Button
            onClick={() => {
              window.location.replace("https://line.me/R/ti/p/%40bxc5238x")
            }}
            color="inherit"
          >
            {lineAvatar}
          </Button>
          <Button
            onClick={() => {
              window.location.replace("https://github.com/superj80820/system-design/tree/master#actress")
            }}
            color="inherit"
          >
            {githubAvatar}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}