import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

import RctSectionLoader from "Components/RctSectionLoader";
import InventoryForm from "../components/forms/InventoryForm";

import { startEditInventory, editInventory } from "Ducks/ims/inventory";

class ims_inventory_edit extends Component {
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
      <DialogRoot show={show} handleHide={handleHide} size="lg">
        {modalLoading ? (
          <RctSectionLoader />
        ) : (
          <InventoryForm
            title="sidebar.editInventory"
            edit={item}
            handleSubmit={this.props.editInventory}
            handleCancel={handleHide}
          />
        )}
      </DialogRoot>
    );
  }
}
const mapStateToProps = ({ imsState }) => {
  const { inventoryForm } = imsState.inventoryState;
  return { inventoryForm };
};

export default connect(
  mapStateToProps,
  { startEditInventory, editInventory }
)(connectModal({ name: "edit_inventory" })(ims_inventory_edit));
