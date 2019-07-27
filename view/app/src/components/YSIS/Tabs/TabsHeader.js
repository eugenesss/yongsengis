import React from "react";

const TabsHeader = ({ title, customClasses }) => {
  return (
    <div
      className={
        "d-flex justify-content-between align-items-start " + customClasses
      }
    >
      <h4 className="mb-30">
        <strong>{title}</strong>
      </h4>
    </div>
  );
};

export default TabsHeader;
