import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import InventoryForm from "Components/Forms/Inventory/InventoryForm";

import { startEditLoctite } from "Actions";

class EditLoctiteModal extends Component {
  componentWillMount() {
    this.props.startEditLoctite(this.props.itemToEdit);
  }
  state = {};
  render() {
    const { show, handleHide } = this.props;
    const { modalLoading } = this.props.loctiteForm;
    return (
      <DialogRoot
        show={show}
        handleHide={handleHide}
        title="Edit Inventory"
        size="lg"
      >
        {modalLoading ? <RctSectionLoader /> : <InventoryForm />}
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
  { startEditLoctite }
)(connectModal({ name: "edit_loctite" })(EditLoctiteModal));
