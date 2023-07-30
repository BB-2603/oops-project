import React, { Component } from "react";
import LoadIcon from "./LoadIcon.gif";

export class LoagingLogo extends Component {
  render() {
    return (
      <div
        style={{
          disply: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <img src={LoadIcon} alt="LoadIcon" />
      </div>
    );
  }
}

export default LoagingLogo;
