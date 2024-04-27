import React, { useState, useEffect, useMemo } from 'react'
import Scroll from "../components/Scroll";
import ActressCard from "../components/ActressCard";
import Bar from "../components/Bar";
import createActressAPIRepo from '../repository/actress-api'
import { useNavigate } from 'react-router-dom';
import { actress } from '../domain/actress'
import Button from "@material-ui/core/Button";
import AdCard from "../components/AdCard";
import DonateCard from "../components/DonateCard";
import { ErrorAlreadyDone, ErrorExpired } from '../domain/error';
import { useAuth, AuthContextInterface } from '../components/AuthContext';

export default function SearchPage() {
  const { actressID, token } = useAuth() as AuthContextInterface
  const navigate = useNavigate()
  const [actress, setActress] = useState<actress>()
  const actressAPIRepo = useMemo(() => createActressAPIRepo(), [])

  useEffect(() => {
    (async (actressID: string) => {
      console.debug("search page actressID:", actressID);

      const actressInformation = await actressAPIRepo.getActressByID(actressID)
        .catch(err => {
          if (err instanceof ErrorExpired) {
            navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`, { replace: true })
          }
        })
      if (!actressInformation) {
        return
      }
      setActress(actressInformation)
    })(actressID)
  }, [actressID, navigate, actressAPIRepo, token])

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
                      actressAPIRepo.addFavorite(actress.id, token.rawData)
                        .then(() => {
                          alert("加入成功")
                        })
                        .catch(err => {
                          if (err instanceof ErrorExpired) {
                            navigate(`/login?${actress.id ? `actressID=${actress.id}` : ""}`, { replace: true })
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
            ] : []
          }
        </Scroll>
      </div>
    </div>
  )
}
