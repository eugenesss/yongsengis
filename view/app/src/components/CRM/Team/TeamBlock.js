import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { Progress } from "reactstrap";
import Avatar from "Components/Everyday/Avatar";

import BgCard from "Components/Everyday/BgCard";
import { RctCardContent } from "Components/RctCard";

const TeamBlock = props => {
  return (
    <BgCard
      customClasses=""
      colClasses=" client-post col-sm-12 col-md-6 col-lg-3 w-xs-full"
      heading="heading"
      editable={props.edit}
      fullBlock
    >
      <RctCardContent>
        <div className="desc-wrap">
          <h5>Description :</h5>
          <p>{"dataItem.desc"}</p>
        </div>
        <div className="project-team mb-15">
          <h5 className="mb-15">Team Members : </h5>
          <div className="team-img-wrap">
            <Tooltip id="tooltip-top" title={`member.name`} placement="top">
              <div className="d-inline-flex mr-2">
                <Avatar name="a n" />
              </div>
            </Tooltip>
            <Tooltip id="tooltip-top" title={`member.name`} placement="top">
              <div className="d-inline-flex mr-2">
                <Avatar name="a n" />
              </div>
            </Tooltip>
            <Tooltip id="tooltip-top" title={`member.name`} placement="top">
              <div className="d-inline-flex mr-2">
                <Avatar name="a n" />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="deadline-info mrgn-b-md">
          <h5>Deadline : </h5>
          <p>{"dataItem.deadline"}</p>
        </div>
        <div className="progress-wrap mb-15">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              Progress :{" "}
              <span className="text-primary">{"dataItem.progress"}%</span>
            </h4>
          </div>
          <Progress color="primary" className="my-15 progress-xs" value={30} />
        </div>
      </RctCardContent>
    </BgCard>
  );
};

export default TeamBlock;
