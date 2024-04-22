import React, { useRef, ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((_) => ({
  root: {
    maxWidth: 330,
    width: 330,
    margin: "10px",
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  avatar: {
    backgroundColor: red[200],
  },
  buttonContent: {

  }
}));

const clickToSearchByStarName = (name: string) => () =>
  window.open(`https://google.com/search?q=${name}`);

export default function ActressCard(prop: {
  actressID: string;
  name: string;
  image: string;
  children: ReactNode;
}) {
  const classes = useStyles();
  const copyNameRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.id = "temp_element";
    textarea.style.height = "0px";
    document.body.appendChild(textarea);
    if (copyNameRef?.current) {
      textarea.value = copyNameRef.current.innerText.slice(2);
    }
    const selector = document.querySelector<HTMLInputElement>("#temp_element");
    if (selector) {
      selector.select();
      document.execCommand("copy");
    }
    document.body.removeChild(textarea);
  };

  return (
    <Card
      className={classes.root}
    >
      <div ref={copyNameRef}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
            >
              {prop.name.slice(0, 1)}
            </Avatar>
          }
          title={prop.name}
        />
      </div>
      {
        prop.image ? (
          <CardMedia
            className={classes.media}
            image={prop.image}
          />) : (
          <div />
        )
      }
      <CardContent>
        <div className="grid-button-container">
          <div className="grid-button-item">
            <Button onClick={copyToClipboard} fullWidth={true} variant="outlined">
              複製姓名
            </Button>
          </div>
          <div className="grid-button-item">
            <Button onClick={clickToSearchByStarName(prop.name)} fullWidth={true} variant="outlined">
              點我搜尋
            </Button>
          </div>
          <div className="grid-button-item">
            {prop.children}
          </div>
        </div>
      </CardContent>
    </Card >
  );
}
