import React, { Component } from "react";
import { connectModal } from "redux-modal";
import moment from "moment";

import DialogRoot from "Components/Dialog/DialogRoot";
import FormInput from "Components/Form/FormInput";
import DatePickerInput from "Components/Form/Pickers/DatePicker";

class NewToDoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      due_date: moment().format("YYYY-MM-DD")
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isDisable = this.isDisable.bind(this);
  }

  componentDidMount() {
    if (this.props.edit)
      this.setState({
        due_date: moment(this.props.edit.due_date).format("YYYY-MM-DD"),
        ...this.props.edit
      });
  }

  handleChange(field, val) {
    this.setState({ [field]: val });
  }

  handleSubmit() {
    // submit
    this.props.submitToDo({ ...this.state });
    this.props.handleHide();
  }

  isDisable() {
    if (this.state.title) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { show, handleHide } = this.props;
    const { title, description, due_date } = this.state;
    return (
      <DialogRoot
        title="To Do Form"
        show={show}
        handleHide={handleHide}
        size="sm"
        dialogAction={this.handleSubmit}
        dialogActionLabel="Save"
        dialogActionDisable={this.isDisable()}
      >
        <FormInput
          label="Title"
          value={title}
          target="title"
          handleChange={this.handleChange}
          required={!title}
        />
        <FormInput
          label="Description"
          value={description}
          target="description"
          handleChange={this.handleChange}
          rows={4}
          multiline
        />
        <DatePickerInput
          label="Due Date"
          value={due_date}
          required={!due_date}
          target="due_date"
          handleChange={this.handleChange}
        />
      </DialogRoot>
    );
  }
}

export default connectModal({ name: "new_todo" })(NewToDoDialog);
