import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
  cardMedia: {
    width: "150px",
    height: "100%",
    margin: "auto",
  },
});

export default function DonateCard(prop: {
  img: string;
  bankName: string;
  bankInfo: string;
}) {
  const classes = useStyles();

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.id = "temp_element";
    textarea.style.height = "0px";
    document.body.appendChild(textarea);
    textarea.value = text;
    const selector = document.querySelector<HTMLInputElement>("#temp_element");
    if (selector) {
      selector.select();
      document.execCommand("copy");
    }
    document.body.removeChild(textarea);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          height="auto"
          image={prop.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {prop.bankName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            也可以透過{prop.bankName} QR Code 抖內
          </Typography>
          &nbsp;
          <Typography variant="body2" color="textSecondary" component="p">
            {prop.bankInfo}
          </Typography>
        </CardContent>
      </CardActionArea>
      &nbsp;
      <CardContent>
        <Button
          onClick={() => copyToClipboard(prop.bankInfo)}
          variant="outlined"
        >
          複製帳戶
        </Button>
      </CardContent>
    </Card>
  );
}
