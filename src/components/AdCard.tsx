import React from "react";
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
});

export default function AdCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://imgur.com/kkkTVKR.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            如果有幫助找到女優
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            您願意的話 歡迎抖內我們的貼圖
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            替這個免費服務的設備與衛生紙負擔一些錢錢
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Q口Q
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Button
          href="https://store.line.me/stickershop/product/12619201"
          variant="outlined"
        >
          點選支持
        </Button>
      </CardContent>
    </Card>
  );
}
