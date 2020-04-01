import React from "react";

const path = "https://ysis-space.sgp1.digitaloceanspaces.com/ysis-space/";
const placeholder = require("Assets/img/placeholder.jpg");

export default function ImageRenderer(props) {
  const { image } = props;
  if (image) {
    return (
      <img
        src={path + image}
        style={{
          width: "200px",
          height: "300px"
        }}
      />
    );
  } else {
    return (
      <img
        src={placeholder}
        style={{
          width: "200px",
          height: "300px"
        }}
      />
    );
  }
}
