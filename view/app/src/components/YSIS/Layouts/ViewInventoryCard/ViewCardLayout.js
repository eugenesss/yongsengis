import React from "react";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const ViewCardLayout = ({ children, statusColor }) => {
  return (
    <RctCollapsibleCard fullBlock>
      <div className="lazy-up">
        <div className="media">
          <div className="media-body mlr-10 pt-20">{children}</div>
        </div>
        {statusColor && (
          <div className="w-100 py-5" style={{ background: statusColor }} />
        )}
      </div>
    </RctCollapsibleCard>
  );
};

export { ViewCardLayout };
