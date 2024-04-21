import React, { useEffect, useState } from 'react'
import Bar from "../components/Bar";
import Carousel from "../components/Carousel";
import Scroll from "../components/Scroll";
import AdCard from "../components/AdCard";
import Button from "@material-ui/core/Button";
import ActressCard from "../components/ActressCard";
import DonateCard from "../components/DonateCard";
import { removeFavorite, getFavorites, actress } from '../repository/actress-api'



export default function FavoritePage() {
  const [favorites, setFavorites] = useState<actress[]>([])

  useEffect(() => {
    (async () => setFavorites(await getFavorites()))()
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
            favorites.map((item) => (<ActressCard
              actressID={item.id}
              name={item.name}
              image={item.image}
              children={
                <Button
                  onClick={async () => {
                    await removeFavorite(item.id);
                    setFavorites(await getFavorites());
                    alert("移除成功");
                  }}
                  fullWidth={true}
                  variant="outlined"
                >
                  移除我心愛的女孩
                </Button>
              }
            />))
          }
        </Scroll>
      </div>
    </div>
  )
}
