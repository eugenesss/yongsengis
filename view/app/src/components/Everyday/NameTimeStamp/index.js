import React from "react";
import { getDateTime } from "Helpers/helpers";

const NameTimeStamp = ({ name, timeStamp }) => {
  return (
    <React.Fragment>
      <span className="fs-12">
        <i>{name}</i>
      </span>
      <br />
      <span style={{ fontSize: "10px", fontWeight: 300 }}>
        {getDateTime(timeStamp)}
      </span>
    </React.Fragment>
  );
};

export default NameTimeStamp;
