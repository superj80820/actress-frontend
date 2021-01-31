import React, { useState, useRef, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import getInfoByID, { star } from "../repository/face-service";
import { verifyProfileResponse } from "../repository/liff-service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      margin: "10px",
    },
    media: {
      height: 0,
      paddingTop: "100%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[200],
    },
  })
);

const clickToSearchByStarName = (name: string) => () =>
  window.open(`https://google.com/search?q=${name}`);

export default function StarCard(prop: {
  Profile: verifyProfileResponse;
  FavoriteButton: any;
  ID: string;
}): any;
export default function StarCard(prop: {
  Profile: verifyProfileResponse;
  FavoriteButton: any;
  Star: star;
}): any;
export default function StarCard(prop: {
  Profile: verifyProfileResponse;
  FavoriteButton: any;
  ID?: string;
  Star?: star;
}) {
  const classes = useStyles();
  const copyNameRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");

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

  useEffect(() => {
    async function fetchAPI(ID: string) {
      const info = await getInfoByID(ID);
      setName(info.name);
      setPreview(info.image);
    }
    if (prop.ID) {
      fetchAPI(prop.ID);
    } else if (prop.Star) {
      setName(prop.Star.name);
      setPreview(prop.Star.image);
    }
  }, [prop]);

  return (
    <Card className={classes.root} style={{ width: "100vw" }}>
      <div ref={copyNameRef}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {name.slice(0, 1)}
            </Avatar>
          }
          title={name}
        />
      </div>
      {preview ? (
        <>
          <CardMedia className={classes.media} image={preview} />
          <CardContent>
            <Button onClick={copyToClipboard} variant="outlined">
              複製姓名
            </Button>
            &nbsp;
            <Button onClick={clickToSearchByStarName(name)} variant="outlined">
              點我搜尋去
            </Button>
            &nbsp;
            {prop.FavoriteButton()}
          </CardContent>
        </>
      ) : (
        <div />
      )}
    </Card>
  );
}
