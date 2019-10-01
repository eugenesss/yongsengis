import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// Modal
import DialogRoot from "Components/Dialog/DialogRoot";

// Components
import BgCard from "Components/Everyday/BgCard";

const EditTeamModal = props => {
  return (
    <DialogRoot
      show={props.show}
      handleHide={props.handleHide}
      size="md"
      title="Lead Converted Successfully!"
      close
    >
      <div className="row">edit team modal</div>
    </DialogRoot>
  );
};

export default EditTeamModal;
