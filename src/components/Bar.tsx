import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, AuthContextInterface } from '../components/AuthContext';
import Avatar from "@material-ui/core/Avatar";

export default function Bar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { token } = useAuth() as AuthContextInterface;
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

  return (
    <AppBar
      position="fixed"
      style={{ color: "#000000", background: "#ffffff" }}
    >
      <Toolbar>
        <Button
          color="inherit"
          onClick={() => navigate("/")}
        >
          {messfarAvatar}
        </Button>
        {token.rawData !== "" ? (<Button
          style={{
            color: location.pathname === "/search" ? red[200] : "#000000",
          }}
          onClick={() => navigate("/search")}
          color="inherit"
        >
          搜尋
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
      </Toolbar>
    </AppBar>
  )
}