import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

import RctSectionLoader from "Components/RctSectionLoader";
import LoctiteForm from "../components/forms/LoctiteForm";

import { startEditLoctite, editLoctite } from "Ducks/ims/loctite";

class ims_loctite_edit extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    this.props.startEditLoctite(this.props.itemToEdit);
  }
  handleEdit(item) {
    this.props.handleHide();
    this.props.editLoctite(item);
  }
  render() {
    const { show, handleHide } = this.props;
    const { modalLoading, loctite } = this.props.loctiteForm;
    return (
      <DialogRoot show={show} handleHide={handleHide} size="lg">
        {modalLoading ? (
          <RctSectionLoader />
        ) : (
          <LoctiteForm
            title="sidebar.editLoctite"
            edit={loctite}
            handleSubmit={this.props.editLoctite}
            handleCancel={handleHide}
          />
        )}
      </DialogRoot>
    );
  }
}
const mapStateToProps = ({ imsState }) => {
  const { loctiteForm } = imsState.loctiteState;
  return { loctiteForm };
};

export default connect(mapStateToProps, { startEditLoctite, editLoctite })(
  connectModal({ name: "edit_loctite" })(ims_loctite_edit)
);
