import React from 'react'
import Bar from "../components/Bar";
import Scroll from "../components/Scroll";
import AdCard from "../components/AdCard";
import DonateCard from "../components/DonateCard";

export default function FavoritePage(prop: {
  favorites: React.ComponentType
}) {
  return (
    <>
      <Bar />
      <div className="grid-container">
        <div className="grid-item-center-first">
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
        <prop.favorites></prop.favorites>
      </div >
    </>
  )
}
