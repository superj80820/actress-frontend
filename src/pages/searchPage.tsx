import React, { useRef, useState, useEffect, ReactNode } from 'react'
import Scroll from "../components/Scroll";
import ActressCard from "../components/ActressCard";
import Bar from "../components/Bar";
import { addFavorite } from '../repository/actress-api'
import { getActressByID, actress } from '../repository/actress-api'
import Button from "@material-ui/core/Button";
import AdCard from "../components/AdCard";
import DonateCard from "../components/DonateCard";
import { useSearchParams } from 'react-router-dom';



export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [actress, setActress] = useState<actress>()
  const actressID = searchParams.get("actressID")
  if (!actressID) {
    return (<></>)
  }

  useEffect(() => {
    (async () => {
      const actressInformation = await getActressByID(actressID)
      setActress(actressInformation)
    })()
  }, [])

  return (
    <div className="grid-container">
      <div className="grid-item">
        <Bar />
      </div>
      <div className="grid-item">
        <Scroll>
          {[
            <AdCard />,
            <DonateCard
              img="https://imgur.com/22UQJUU.png"
              bankName="Line Bank"
              bankInfo="(824)111012580847"
            />,
            <DonateCard
              img="https://imgur.com/3ftbKKP.png"
              bankName="街口支付"
              bankInfo="(396)906114476"
            />,
            <DonateCard
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
                actressID={actressID}
                name={actress.name}
                image={actress.image}
                children={
                  <Button
                    onClick={async () => {
                      await addFavorite(actressID);
                      alert("加入成功");
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
