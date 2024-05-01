import React, { ReactNode, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { useNavigate } from 'react-router-dom';
import { red } from "@material-ui/core/colors";
import { ErrorToken } from '../domain/error';
import createActressAPIRepo from '../repository/actress-api'
import { useAuth, AuthContextInterface } from '../components/AuthContext';

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


export default function UploadActressCard(prop: {
  children?: ReactNode
}) {
  const classes = useStyles();
  const navigate = useNavigate()
  const { setActressID, token, actressID } = useAuth() as AuthContextInterface
  const actressAPIRepo = useMemo(() => createActressAPIRepo(), [])
  const uploadOriginTitle = "請上傳辨識圖片(限制20MB)"
  const [uploadTitle, setUploadTitle] = useState(uploadOriginTitle)

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files ? event.target.files[0] : null;
    if (imageFile) {
      setUploadTitle("上傳圖片中...")
      const actresses = await actressAPIRepo.searchActressByFace(imageFile, token.rawData).catch(err => {
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
          {
            prop.children ? (
              <div className="grid-button-item">
                {prop.children}
              </div>
            ) : (
              <></>
            )}
        </div>
      </CardContent>
    </Card >
  );
}
