import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import LoctiteForm from "Components/Forms/Loctite/LoctiteForm";

import { startEditLoctite, editLoctite } from "Actions";

class EditLoctiteModal extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentWillMount() {
    this.props.startEditLoctite(this.props.itemToEdit);
  }
  handleEdit(item) {
    this.props.editLoctite(item);
    this.props.handleHide();
  }
  render() {
    const { show, handleHide } = this.props;
    const { modalLoading, loctite } = this.props.loctiteForm;
    return (
      <DialogRoot
        show={show}
        handleHide={handleHide}
        title="Edit Inventory"
        size="lg"
      >
        {modalLoading ? (
          <RctSectionLoader />
        ) : (
          <LoctiteForm
            edit={loctite}
            handleSubmit={this.handleEdit}
            handleCancel={handleHide}
          />
        )}
      </DialogRoot>
    );
  }
}
const mapStateToProps = ({ loctiteState }) => {
  const { loctiteForm } = loctiteState;
  return { loctiteForm };
};

export default connect(
  mapStateToProps,
  { startEditLoctite, editLoctite }
)(connectModal({ name: "edit_loctite" })(EditLoctiteModal));
