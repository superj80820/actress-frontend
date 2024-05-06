import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { useAuth, AuthContextInterface } from './AuthContext';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      width: 250
    }
  }),
);

export default function Bar() {
  const classes = useStyles();
  const navigate = useNavigate()
  const location = useLocation()
  const [title, setTitle] = useState("");

  const setTitleHandler = (path: string) => {
    switch (path) {
      case "/":
        setTitle("首頁")
        break
      case "/login":
        setTitle("登入")
        break
      case "/imageSearch":
        setTitle("圖片搜尋")
        break
      case "/nameSearch":
        setTitle("姓名搜尋")
        break
      case "/favorite":
        setTitle("心愛的女孩")
        break
    }
  }

  useEffect(() => {
    setTitleHandler(location.pathname)
  }, [location])


  const { logout, authInformation } = useAuth() as AuthContextInterface;
  const githubAvatar = (
    <Avatar className={classes.smallAvatar}>
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
    <Avatar className={classes.smallAvatar}>
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
    <Avatar className={classes.smallAvatar}>
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    authInformation ?
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>{title}</Typography>
            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
              <List className={classes.drawer}>
                <ListItem button onClick={() => { navigate("/") }}>
                  <ListItemText primary="首頁" />
                </ListItem>
                {authInformation.token === null ?
                  <ListItem button onClick={() => { navigate("/login") }}>
                    <ListItemText primary="登入" />
                  </ListItem>
                  :
                  <></>}
                {authInformation.token !== null ?
                  <ListItem button onClick={() => { navigate("/nameSearch") }}>
                    <ListItemText primary="姓名搜尋" />
                  </ListItem>
                  :
                  <></>}
                {authInformation.token !== null ?
                  <ListItem button onClick={() => { navigate("/imageSearch") }}>
                    <ListItemText primary="圖片搜尋" />
                  </ListItem>
                  :
                  <></>}
                {authInformation.token !== null ?
                  <ListItem button onClick={() => { navigate("/favorite") }}>
                    <ListItemText primary="心愛的女孩" />
                  </ListItem>
                  :
                  <></>}
                {authInformation.token !== null && authInformation.platform !== "liff" ?
                  <ListItem button onClick={() => {
                    logout()
                    navigate("/")
                  }}>
                    <ListItemText primary="登出" />
                  </ListItem>
                  :
                  <></>}
              </List>
            </Drawer>
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
      </div> : <></>
  )
}