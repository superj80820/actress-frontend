import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import GridActresses from "../components/GridActresses";
import ActressCard from "./ActressCard";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { useNavigate } from 'react-router-dom';
import { red } from "@material-ui/core/colors";
import { ErrorToken } from '../domain/error';
import { useAuth, AuthContextInterface } from './AuthContext';
import { actressAPIRepo, actress } from '../domain/actress';
import { ErrorAlreadyDone } from '../domain/error';
import Scroll from "./Scroll";
import AdCard from "../components/AdCard";
import DonateCard from "../components/DonateCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    margin: "10px",
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
  const { authInformation, actressID } = useAuth() as AuthContextInterface
  const uploadOriginTitle = "請上傳辨識圖片(限制20MB)"
  const [uploadTitle, setUploadTitle] = useState(uploadOriginTitle)
  const [actresses, setActresses] = useState<actress[] | null>(null)

  useEffect(() => {
    if (actressID === null) {
      return
    }

    (async (actressID: string) => {
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
      setActresses([
        actressInformation
      ])
    })(actressID)
  }, [actressID, navigate, prop.actressAPIRepo])

  const addFavorite = async (actressID: string, token: string) => {
    prop.actressAPIRepo.addFavorite(actressID, token)
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
  }

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (authInformation === null || authInformation.token === null) {
      return
    }

    const imageFile = event.target.files ? event.target.files[0] : null;
    if (imageFile) {
      setUploadTitle("上傳圖片中...")
      const actresses = await prop.actressAPIRepo.searchActressByFace(imageFile, authInformation.token).catch(err => {
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
      setActresses(actresses)
      setUploadTitle(uploadOriginTitle)
    }
  };

  const searchElement = () => (
    <div className="grid-item-full-width">
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
          <div>
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
        </CardContent>
      </Card >
    </div>
  )

  return (
    actresses !== null && actresses.length !== 0 ?
      <>
        {searchElement()}
        <div className="grid-item-full-width">
          <Scroll>
            {[
              <AdCard key={"adCard"} />,
              <DonateCard
                key="lineBank"
                img="https://imgur.com/22UQJUU.png"
                bankName="Line Bank"
                bankInfo="(824)111012580847"
              />,
              <DonateCard
                key="jkopay"
                img="https://imgur.com/3ftbKKP.png"
                bankName="街口支付"
                bankInfo="(396)906114476"
              />,
              <DonateCard
                key="cathaybk"
                img="https://imgur.com/9sVYLSn.png"
                bankName="國泰銀行"
                bankInfo="(013)204506227890"
              />,
            ]}
          </Scroll>
        </div>
        <GridActresses>
          {
            actresses.map(actress => (
              <ActressCard
                key={actress.name}
                actressID={actress.id}
                name={actress.name}
                image={actress.image}
                romanization={actress.romanization}
                children={
                  <Button
                    onClick={() => {
                      if (authInformation === null || authInformation.token === null) {
                        return
                      }
                      return addFavorite(actress.id, authInformation.token)
                    }}
                    fullWidth={true}
                    variant="outlined"
                  >
                    加入我心愛的女孩
                  </Button>
                }
              />
            ))
          }
        </GridActresses >
      </>
      :
      searchElement()
  )
}