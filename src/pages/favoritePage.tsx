import React, { useEffect, useState, useMemo } from 'react'
import Bar from "../components/Bar";
import Scroll from "../components/Scroll";
import AdCard from "../components/AdCard";
import Button from "@material-ui/core/Button";
import ActressCard from "../components/ActressCard";
import DonateCard from "../components/DonateCard";
import { useNavigate } from 'react-router-dom';
import { actress } from "../domain/actress";
import useToken, { getToken } from '../repository/auth-storage';
import createActressAPIRepo from '../repository/actress-api'
import { ErrorExpired } from '../domain/error';
import { useSearchParams } from 'react-router-dom';

export default function FavoritePage() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<actress[]>([])
  const actressAPIRepo = useMemo(() => createActressAPIRepo(), [])
  const { token } = useToken()
  const [actressID, setActressID] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const actressID = searchParams.get("actressID")
    if (!actressID) {
      return
    }
    const token = getToken()
    if (!token) {
      navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`, { replace: true })
      return
    }
    setActressID(actressID)
    if (!token) {
      return
    }
    (async (token: string) => {
      const favorites = await actressAPIRepo.getFavorites(token)
        .catch(err => {
          if (err instanceof ErrorExpired) {
            navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`, { replace: true })
          }
        })
      if (!favorites) {
        setFavorites([])
        return
      }
      setFavorites(favorites)
    })(token)
  }, [searchParams, navigate, actressAPIRepo])

  return (
    <div className="grid-container">
      <div className="grid-item">
        <Bar />
      </div>
      <div className="grid-item">
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
      <div className="grid-item">
        <Scroll>
          {
            favorites.length !== 0 ? favorites.map((item) => (<ActressCard
              key={item.id}
              actressID={item.id}
              name={item.name}
              image={item.image}
              children={
                <Button
                  onClick={async () => {
                    if (!token) {
                      return
                    }
                    await actressAPIRepo.removeFavorite(item.id, token)
                      .catch(err => {
                        if (err instanceof ErrorExpired) {
                          navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`, { replace: true })
                        }
                      })
                    alert("移除成功")
                    const favorites = await actressAPIRepo.getFavorites(token)
                      .catch(err => {
                        if (err instanceof ErrorExpired) {
                          navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`, { replace: true })
                        }
                      })
                    if (!favorites) {
                      setFavorites([])
                      return
                    }
                    setFavorites(favorites);
                  }}
                  fullWidth={true}
                  variant="outlined"
                >
                  移除我心愛的女孩
                </Button>
              }
            />)) : []
          }
        </Scroll>
      </div>
    </div>
  )
}
