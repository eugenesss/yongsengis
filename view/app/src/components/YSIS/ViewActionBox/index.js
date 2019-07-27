import React from "react";
import Button from "@material-ui/core/Button";

const ViewActionBox = ({ children }) => {
  return (
    <div className="rct-block p-20">
      {children.length > 1 ? (
        children.map((child, key) => {
          return (
            <Button
              key={key}
              variant="contained"
              className={`mb-10 w-100 d-block ${child.customClasses}`}
              size="large"
              color={child.color}
              onClick={child.onClick}
            >
              {child.label} <i className={`zmdi ${child.icon} ml-5`} />
            </Button>
          );
        })
      ) : (
        <Button
          variant="contained"
          className={`w-100 d-block ${children.customClasses}`}
          size="large"
          color="primary"
        >
          {children.label}
        </Button>
      )}
    </div>
  );
};

export default ViewActionBox;
