// @ts-nocheck
import React from "react";

export default class AdComponent extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9952955115768283"
        data-ad-slot="9339833625"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}
