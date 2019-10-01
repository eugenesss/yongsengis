import React from "react";
import BgCard from "Components/Everyday/BgCard";

const Wrapper = props => (
  <BgCard fullBlock>
    <div className="profile-card">{props.children}</div>
  </BgCard>
);

export { Wrapper };
