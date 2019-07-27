import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import InventoryForm from "Components/Forms/Inventory/InventoryForm";

import { startEditInventory, editInventory } from "Actions";

class EditInventoryModal extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentWillMount() {
    this.props.startEditInventory(this.props.itemToEdit);
  }
  handleEdit(item) {
    this.props.editInventory(item);
    this.props.handleHide();
  }
  render() {
    const { show, handleHide } = this.props;
    const { modalLoading, item } = this.props.inventoryForm;
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
          <InventoryForm
            edit={item}
            handleSubmit={this.props.editInventory}
            handleCancel={handleHide}
          />
        )}
      </DialogRoot>
    );
  }
}
const mapStateToProps = ({ inventoryState }) => {
  const { inventoryForm } = inventoryState;
  return { inventoryForm };
};

export default connect(
  mapStateToProps,
  { startEditInventory, editInventory }
)(connectModal({ name: "edit_inventory" })(EditInventoryModal));
