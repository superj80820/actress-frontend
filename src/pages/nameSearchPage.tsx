import React from 'react'
import Scroll from "../components/Scroll";
import Bar from "../components/Bar";
import AdCard from "../components/AdCard";
import DonateCard from "../components/DonateCard";

export default function NameSearchPage(prop: {
  nameSearch: React.ComponentType
}) {
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
        <prop.nameSearch></prop.nameSearch>
      </div>
    </div>
  )
}
