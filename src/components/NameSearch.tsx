import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Scroll from "./Scroll";
import ActressCard from "./ActressCard";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { useNavigate } from 'react-router-dom';
import { red } from "@material-ui/core/colors";
import { ErrorToken } from '../domain/error';
import { useAuth, AuthContextInterface } from './AuthContext';
import { actressAPIRepo, actress } from '../domain/actress';
import { ErrorAlreadyDone } from '../domain/error';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 330,
    width: 330,
    margin: "10px",
  },
  uploadButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formElement: {
    '& > *': {
      margin: theme.spacing(1),
      width: '15ch',
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  avatar: {
    backgroundColor: red[200],
  },
  buttonContent: {},
  input: {
    display: 'none',
  }
}));

export const NameSearch = (prop: {
  actressAPIRepo: actressAPIRepo
}) => {
  const classes = useStyles();
  const navigate = useNavigate()
  const { token, actressID } = useAuth() as AuthContextInterface
  const uploadOriginTitle = "請輸入姓名"
  const [uploadTitle, setUploadTitle] = useState(uploadOriginTitle)
  const [actresses, setActresses] = useState<actress[]>([])
  const [name, setName] = useState('');


  useEffect(() => {
    console.debug("name search page actressID:", actressID);
  })

  const onClick = async () => {
    if (name) {
      setUploadTitle("搜尋中...")
      const actresses = await prop.actressAPIRepo.searchActressByName(name, token.rawData).catch(err => {
        if (err instanceof ErrorToken) {
          navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`)
          return
        }
        console.error("upload failed", err)
        alert("上傳失敗")
        setUploadTitle(uploadOriginTitle)
      })
      if (!actresses || actresses.length <= 0) {
        alert("搜尋失敗")
        setUploadTitle(uploadOriginTitle)
        return
      }
      setActresses(actresses)
      setUploadTitle(uploadOriginTitle)
    }
  };

  return (
    <Scroll>
      {
        actresses.length !== 0 ?
          actresses.map(actress => (
            <ActressCard
              key={actress.name}
              actressID={actress.id}
              name={actress.name}
              image={actress.image}
              children={
                <Button
                  onClick={async () => {
                    if (!token) {
                      return
                    }
                    prop.actressAPIRepo.addFavorite(actressID, token.rawData)
                      .then(() => {
                        alert("加入成功")
                      })
                      .catch(err => {
                        if (err instanceof ErrorToken) {
                          navigate(`/login?actressID=${actressID}`)
                        } else if (err instanceof ErrorAlreadyDone) {
                          alert("已存在於我心愛的女孩")
                        }
                      })
                  }}
                  fullWidth={true}
                  variant="outlined"
                >
                  加入我心愛的女孩
                </Button>
              }
            />
          ))
          :
          [
            <Card
              className={classes.root}
            >
              <div>
                <CardHeader
                  avatar={
                    <Avatar
                      className={classes.avatar}
                    >
                      名
                    </Avatar>
                  }
                  title={uploadTitle}
                />
              </div>
              <CardContent>
                <div className="grid-button-container">
                  <div className="grid-button-item">
                    <div>
                      <form className={classes.formElement} noValidate autoComplete="off">
                        <TextField id="name-input" onChange={event => { setName(event.target.value) }} label="姓名" />
                      </form>
                    </div>
                    <div className={classes.uploadButton} >
                      <label htmlFor="contained-button-file">
                        <Button variant="outlined" onClick={onClick} fullWidth={true} component="span">
                          搜尋
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card >
          ]
      }
    </Scroll>
  )
}