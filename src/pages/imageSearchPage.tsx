import React from 'react'
import Bar from "../components/Bar";

export default function ImageSearchPage(prop: {
  imageSearch: React.ComponentType
}) {
  return (
    <>
      <Bar />
      <div className="grid-container">
        <prop.imageSearch></prop.imageSearch>
      </div>
    </>
  )
}
