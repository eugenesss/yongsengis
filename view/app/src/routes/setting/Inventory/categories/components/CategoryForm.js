import React, { Component } from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

import FormInput from "Components/Form/FormInput";

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { cat_name: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.edit && this.setState({ ...this.props.edit });
  }

  handleChange(field, val) {
    this.setState({ [field]: val });
  }

  handleSubmit() {
    this.props.submitForm(this.state);
  }

  render() {
    const { show, handleHide } = this.props;
    return (
      <DialogRoot
        title="Category Form"
        size="sm"
        show={show}
        handleHide={handleHide}
        dialogActionLabel={"Save"}
        dialogAction={this.handleSubmit}
        close
      >
        <FormInput
          label="Name"
          value={this.state.cat_name}
          target="cat_name"
          handleChange={this.handleChange}
          required={!this.state.cat_name}
        />
      </DialogRoot>
    );
  }
}

export default connectModal({ name: "category_form" })(CategoryForm);
