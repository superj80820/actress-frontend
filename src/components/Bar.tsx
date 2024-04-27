import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, AuthContextInterface } from '../components/AuthContext';


export default function Bar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { actressID } = useAuth() as AuthContextInterface

  return (
    <AppBar
      position="fixed"
      style={{ color: "#000000", background: "#ffffff" }}
    >
      <Toolbar>
        {actressID ? (
          <Button
            style={{
              color: location.pathname === "/search" ? red[200] : "#000000",
            }}
            onClick={() => navigate("/search", { replace: true })}
            color="inherit"
          >
            搜尋結果
          </Button>
        ) : (
          <></>
        )}
        <Button
          style={{
            color: location.pathname === "/favorite" ? red[200] : "#000000",
          }}
          onClick={() => navigate("/favorite", { replace: true })}
          color="inherit"
        >
          我心愛的女孩
        </Button>
      </Toolbar>
    </AppBar>
  )
}