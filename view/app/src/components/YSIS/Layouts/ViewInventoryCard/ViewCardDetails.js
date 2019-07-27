import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const ViewCardDetails = ({ children }) => {
  return (
    <div className="m-10">
      {children.length > 0 ? (
        children.map((child, key) => {
          return (
            <div key={key} className="row pb-10 justify-content-md-center">
              <div className="col-lg-2 offset-md-2 align-self-center text-center ">
                <Tooltip title={child.title} placement="top">
                  <i className={`zmdi ${child.icon} mb-2`} />
                </Tooltip>
              </div>
              <div className="col-lg-6">
                <p className="mb-1 fs-12">{child.detail}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="row ml-10 px-3 pb-10 justify-content-md-center">
          <div className="col-lg-2 align-self-center text-center ">
            <Tooltip title={children.title} placement="top">
              <i className={`zmdi ${children.icon} mb-2`} />
            </Tooltip>
          </div>
          <div className="col-lg-8">
            <p className="mb-1 fs-12">{children.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export { ViewCardDetails };
