import React, { ReactNode } from 'react'

const GridContainer = (props: { children: ReactNode[] }) => {
  return (
    <>
      {props.children.map((item, index) => (
        <div className="grid-item" key={index}>
          {item}
        </div>
      ))}
    </>
  )
}

export default GridContainer