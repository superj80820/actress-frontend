import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TelegramLoginButton, {
  TelegramUser,
} from "@v9v/ts-react-telegram-login";
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
  },
}));

export default function LoginCard(prop: { ActressID: string }) {
  const classes = useStyles();

  const lineIcon = (
    <Icon>
      <img
        alt="edit"
        style={{
          width: "140%",
          position: "relative",
          bottom: "5px",
          right: "5px",
        }}
        src="line_icon.png"
      />
    </Icon>
  );

  const discordIcon = (
    <Icon>
      <img
        alt="edit"
        style={{
          width: "140%",
          position: "relative",
          bottom: "5px",
          right: "5px",
        }}
        src="discord_icon.svg"
      />
    </Icon>
  );

  const lineLogin = (actressID: string) =>
    window.location.replace(
      "https://access.line.me/oauth2/v2.1/authorize?" +
        "response_type=code" +
        "&client_id=1655529572" +
        `&redirect_uri=${
          window.location.origin
        }?ID=${actressID}&state=${new Date().getTime()}&scope=profile%20openid&nonce=${new Date().getTime()}`
    );

  const telegramLogin = (user: TelegramUser) => {
    window.location.replace(
      `${window.location.origin}?platform=telegram&code=${btoa(
        JSON.stringify(user)
      )}`
    );
  };

  const discordLogin = (actressID: string) =>
    window.location.replace(
      "https://discord.com/api/oauth2/authorize?client_id=939965475629178911&redirect_uri=https%3A%2F%2Fmessfar.com%2F%3Fplatform%3Ddiscord&response_type=code&scope=identify%20email"
    );

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="messfar_icon.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            登入
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
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
          onClick={() => discordLogin(prop.ActressID)}
        >
          　Discord　
        </Button>
        <div style={{ padding: "4px" }}></div>
        <TelegramLoginButton
          usePic={false}
          dataOnAuth={telegramLogin}
          botName="MessfarBot"
        />
      </CardContent>
    </Card>
  );
}
