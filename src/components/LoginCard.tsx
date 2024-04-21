import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: "5em",
    width: "19em"
  },
  buttonGridContainer: {
    display: "grid",
    gridTemplateColumns: "auto",
  },
  buttonGridItem: {
    display: "grid",
    placeItems: "center",
  }
}));

export default function LoginCard(prop: { ActressID: string | null }) {
  const classes = useStyles();

  const lineIcon = (
    <Icon>
      <img
        src={process.env.PUBLIC_URL + '/images/line_icon.png'}
        alt="line icon"
        style={{
          width: "140%",
          position: "relative",
          bottom: "5px",
          right: "5px",
        }}
      />
    </Icon>
  );

  const discordIcon = (
    <Icon>
      <img
        src={process.env.PUBLIC_URL + "/images/discord_icon.svg"}
        alt="discord icon"
        style={{
          width: "140%",
          position: "relative",
          bottom: "5px",
          right: "5px",
        }}
      />
    </Icon>
  );

  const telegramIcon = (
    <Icon>
      <img
        src={process.env.PUBLIC_URL + "/images/telegram_icon.png"}
        alt="telegram icon"
        style={{
          width: "95%",
          position: "relative",
          bottom: "6px",
        }}
      />
    </Icon>
  );

  const lineLogin = (actressID: string | null) => {
    let redirectArgs = ["line"]

    if (actressID) {
      redirectArgs.push(actressID)
    }

    window.location.replace(
      "https://access.line.me/oauth2/v2.1/authorize?" +
      "response_type=code" +
      "&client_id=1655529572" +
      `&redirect_uri=${window.location.origin}?` +
      `linePlatformArgs=${redirectArgs.join(",")}` +
      `&state=${new Date().getTime()}&scope=profile%20openid&nonce=${new Date().getTime()}`
    );
  }

  const telegramLogin = (user: any) => {
    window.location.replace(
      `${window.location.origin}?platform=telegram&code=${btoa(
        JSON.stringify(user)
      )}`
    );
  };

  const discordLogin = () =>
    window.location.replace(
      "https://discord.com/api/oauth2/authorize?client_id=939965475629178911&redirect_uri=https%3A%2F%2Fmessfar.com%2F%3Fplatform%3Ddiscord&response_type=code&scope=identify%20email"
    );

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL + "/images/messfar_icon.jpg"}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            登入
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <div className={classes.buttonGridContainer}>
          <div className={classes.buttonGridItem}>
            <Button
              className={classes.button}
              style={{
                backgroundColor: "#02C755",
                color: "#ffffff",
                padding: "8px ​25p",
              }}
              size="large"
              variant="contained"
              disableElevation={true}
              startIcon={lineIcon}
              onClick={() => lineLogin(prop.ActressID)}
            >
              Line
            </Button>
          </div>
          <div className={classes.buttonGridItem}>
            <Button
              className={classes.button}
              style={{
                backgroundColor: "#8B9DFF",
                color: "#ffffff",
                padding: "8px ​25p",
              }}
              size="large"
              variant="contained"
              disableElevation={true}
              startIcon={discordIcon}
              onClick={() => discordLogin()}
            >
              Discord
            </Button>
          </div>
          <div className={classes.buttonGridItem}>
            <Button
              className={classes.button}
              style={{
                backgroundColor: "#32A9DF",
                color: "#ffffff",
                padding: "8px ​25p",
              }}
              size="large"
              variant="contained"
              disableElevation={true}
              startIcon={telegramIcon}
              onClick={() => telegramLogin(prop.ActressID)}
            >
              Telegram
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
