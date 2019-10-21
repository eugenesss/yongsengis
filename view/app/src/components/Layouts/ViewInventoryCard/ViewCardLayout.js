import React from "react";
import BgCard from "Components/BgCard";

const ViewCardLayout = ({ children, statusColor }) => {
  return (
    <BgCard fullBlock>
      <div className="lazy-up">
        <div className="media">
          <div className="media-body mlr-10 pt-20">{children}</div>
        </div>
        {statusColor && (
          <div className="w-100 py-5" style={{ background: statusColor }} />
        )}
      </div>
    </BgCard>
  );
};

export { ViewCardLayout };
