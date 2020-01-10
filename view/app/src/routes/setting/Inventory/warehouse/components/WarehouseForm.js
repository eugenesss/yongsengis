import React, { Component } from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

// Form Component
import FormInput from "Components/Form/FormInput";

class WarehouseForm extends Component {
  constructor(props) {
    super(props);
    this.state = { wh_name: "", location: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.edit &&
      this.setState({
        // name: this.props.edit.wh_name,
        ...this.props.edit
      });
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
        title="Warehouse Form"
        size="sm"
        show={show}
        handleHide={handleHide}
        dialogActionLabel={"Save"}
        dialogAction={this.handleSubmit}
        close
      >
        <FormInput
          label="Name"
          value={this.state.wh_name}
          target="wh_name"
          handleChange={this.handleChange}
          required={!this.state.wh_name}
        />
        <FormInput
          label="Location"
          value={this.state.location}
          target="location"
          handleChange={this.handleChange}
        />
      </DialogRoot>
    );
  }
}

export default connectModal({ name: "warehouse_form" })(WarehouseForm);
