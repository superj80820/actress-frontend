import React, { useState } from "react";
import Flicking from "@egjs/react-flicking";
import cx from "classnames";
import "@egjs/react-flicking/dist/flicking.css";

export default function Carousel(prop: {
  array: Array<any>;
  height: string;
}) {
  const [currentIdx, setCurrentIdex] = useState(0);

  return (
    <Flicking
      align="center"
      adaptive
      useFractionalSize
      resizeOnContentsReady
      onMoveStart={(e) => {
        console.log("move");
      }}
      onChanged={(e) => {
        console.log("done", e);
        setCurrentIdex(e.index);
        e.currentTarget.resize();
        // setCurrentIdex(e.currentTarget.getStatus().index);
      }}
    >
      {prop.array.map((item, idx) => (
        <div
          className={cx("carousel-panel", idx === currentIdx && "active")}
          key={idx}
          style={{
            height: prop.height,
          }}
        >
          <div>{item}</div>
        </div>
      ))}
    </Flicking>
  );
}
