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

export const ImageSearch = (prop: {
  actressAPIRepo: actressAPIRepo
}) => {
  const classes = useStyles();
  const navigate = useNavigate()
  const { setActressID, token, actressID } = useAuth() as AuthContextInterface
  const uploadOriginTitle = "請上傳辨識圖片(限制20MB)"
  const [uploadTitle, setUploadTitle] = useState(uploadOriginTitle)
  const [actress, setActress] = useState<actress>()

  useEffect(() => {
    (async (actressID: string) => {
      if (actressID === "") {
        return
      }

      console.debug("image search page actressID:", actressID);

      const actressInformation = await prop.actressAPIRepo.getActressByID(actressID)
        .catch(err => {
          if (err instanceof ErrorToken) {
            navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`)
          }
        })
      if (!actressInformation) {
        return
      }
      setActress(actressInformation)
    })(actressID)
  }, [actressID, navigate, prop.actressAPIRepo, token])

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files ? event.target.files[0] : null;
    if (imageFile) {
      setUploadTitle("上傳圖片中...")
      const actresses = await prop.actressAPIRepo.searchActressByFace(imageFile, token.rawData).catch(err => {
        if (err instanceof ErrorToken) {
          navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`)
          return
        }
        console.error("upload failed", err)
        alert("上傳失敗")
        setUploadTitle(uploadOriginTitle)
      })
      if (!actresses || actresses.length <= 0) {
        alert("辨識失敗")
        setUploadTitle(uploadOriginTitle)
        return
      }
      setActressID(actresses[0].id)
      setUploadTitle(uploadOriginTitle)
    }
  };

  return (
    <Scroll>
      {
        actress ? [
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
        ] : [
          <Card
            className={classes.root}
          >
            <div>
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.avatar}
                  >
                    搜
                  </Avatar>
                }
                title={uploadTitle}
              />
            </div>
            <CardContent>
              <div className="grid-button-container">
                <div className="grid-button-item">
                  <div className={classes.uploadButton} >
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={onFileChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="outlined" fullWidth={true} component="span">
                        上傳圖片
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