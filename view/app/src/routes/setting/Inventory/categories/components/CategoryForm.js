import React, { Component } from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

class CategoryForm extends Component {
  state = {};
  render() {
    const { show, handleHide } = this.props;
    return (
      <DialogRoot
        title="Category"
        size="md"
        show={show}
        handleHide={handleHide}
        dialogActionLabel={"Save"}
        // dialogAction={edit ? this.onUpdate : this.onSubmit}
        close
      >
        category_form
      </DialogRoot>
    );
  }
}

export default connectModal({ name: "category_form" })(CategoryForm);
