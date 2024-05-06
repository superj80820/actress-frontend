import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Scroll from "./Scroll";
import GridActresses from "./GridActresses";
import ActressCard from "./ActressCard";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from "@material-ui/core/Avatar";
import { useNavigate } from 'react-router-dom';
import { red } from "@material-ui/core/colors";
import { ErrorToken } from '../domain/error';
import { useAuth, AuthContextInterface } from './AuthContext';
import { actressAPIRepo, actress } from '../domain/actress';
import { ErrorAlreadyDone } from '../domain/error';
import TextField from '@material-ui/core/TextField';
import AdCard from "../components/AdCard";
import DonateCard from "../components/DonateCard";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    margin: "10px",
  },
  formElement: {
    '& > *': {
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
  const { authInformation, actressID } = useAuth() as AuthContextInterface
  const uploadOriginTitle = "請輸入姓名"
  const [uploadTitle, setUploadTitle] = useState(uploadOriginTitle)
  const [actresses, setActresses] = useState<actress[]>([])
  const [name, setName] = useState('');
  const limit = 30
  let page = 1
  const [pageCount, setPageCount] = useState(1)

  const fetchSearchByName = useCallback((page: number, limit: number) => {
    if (!authInformation || authInformation.token === null) {
      return
    }
    const token = authInformation.token

    if (name) {
      setUploadTitle("搜尋中...")
      prop.actressAPIRepo.searchActressByName(name, page, limit, token)
        .then(actressWithPagination => {
          if (actressWithPagination.actresses.length <= 0) {
            alert("無相似姓名女星")
            setUploadTitle(uploadOriginTitle)
          } else {
            setActresses(actressWithPagination.actresses)
            setUploadTitle(uploadOriginTitle)
          }
          setPageCount(Math.floor(actressWithPagination.total / actressWithPagination.limit) + 1)
        })
        .catch(err => {
          if (err instanceof ErrorToken) {
            navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`)
            return
          }
          console.error("upload failed", err)
          alert("上傳失敗")
          setUploadTitle(uploadOriginTitle)
        })
    }
  }, [actressID, authInformation, name, navigate, prop.actressAPIRepo])


  const onChangePagination = (page: number) => {
    fetchSearchByName(page, limit)
  }

  useEffect(() => {
    console.debug("name search page actressID:", actressID);
  })

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

  const SearchButton = () => (
    <IconButton>
      <SearchIcon />
    </IconButton>
  )

  const searchElement = () => (
    <div className="grid-item-full-width">
      < Card
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
          <TextField
            id="name-input"
            label="姓名"
            fullWidth={true}
            onChange={event => { setName(event.target.value) }}
            InputProps={{
              onClick: () => {
                if (authInformation === null || authInformation.token === null) {
                  return
                }
                return fetchSearchByName(page, limit)
              },
              endAdornment: <SearchButton />
            }}
          />
        </CardContent>
      </Card >
    </div>
  )

  return (
    actresses.length !== 0 ?
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
        </GridActresses>
        {
          pageCount ?
            <div className="grid-item-full-center">
              <Pagination onChange={(_, page) => onChangePagination(page)} count={pageCount} color="secondary" />
            </div>
            :
            <></>
        }
      </>
      :
      searchElement()
  )
}