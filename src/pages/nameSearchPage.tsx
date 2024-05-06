import React from 'react'
import Bar from "../components/Bar";

export default function NameSearchPage(prop: {
  nameSearch: React.ComponentType
}) {
  return (
    <>
      <Bar />
      <div className="grid-container">
        <prop.nameSearch></prop.nameSearch>
      </div>
    </>
  )
}
