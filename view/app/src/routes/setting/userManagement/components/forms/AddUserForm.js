import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "@material-ui/core";
// Form Inputs
import FormInput from "Components/Form/FormInput";

import { addUser, editUser } from "Ducks/setting/userManagement";

const INIT_STATE = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  confirmPassword: "",
  access: ""
};

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.edit ? this.props.edit : INIT_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleEditForm = this.handleEditForm.bind(this);
    this.checkDisable = this.checkDisable.bind(this);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleSubmitForm() {
    const newUser = {
      ...this.state,
      name: `${this.state.first_name} ${this.state.last_name}`
    };
    this.props.addUser(newUser);
  }

  handleEditForm() {
    this.props.editUser(this.state);
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  checkDisable() {
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword
    } = this.state;
    if (this.props.edit)
      return !first_name || !last_name || !this.validateEmail(email);
    return (
      !first_name ||
      !last_name ||
      !this.validateEmail(email) ||
      !password ||
      password !== confirmPassword
    );
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword
    } = this.state;
    return (
      <form autoComplete="off">
        <h3 style={{ marginLeft: 35 }}>Contact Details</h3>
        <div className="row mb-20 justify-content-center">
          <div className="col-5">
            <FormInput
              label="First Name"
              value={first_name}
              required={!first_name}
              target="first_name"
              handleChange={this.handleChange}
            />
          </div>
          <div className="col-5 offset-md-1">
            <FormInput
              label="Last Name"
              value={last_name}
              required={!last_name}
              target="last_name"
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <h3 style={{ marginLeft: 35 }}>User Details</h3>
        <div className="row justify-content-center">
          <div className="col-11">
            <FormInput
              label="Email"
              value={email}
              required={!email}
              target="email"
              handleChange={this.handleChange}
            />
          </div>
        </div>
        {!this.props.edit && (
          <div className="row mb-20 justify-content-center">
            <div className="col-5">
              <FormInput
                label="Password"
                value={password}
                required={!password}
                target="password"
                handleChange={this.handleChange}
              />
            </div>
            <div className="col-5 offset-md-1">
              <FormInput
                label="Confirm Password"
                value={confirmPassword}
                required={password !== confirmPassword}
                helperText="Password has to match."
                target="confirmPassword"
                handleChange={this.handleChange}
              />
            </div>
          </div>
        )}
        <div className="row mb-20 justify-content-center">
          <div className="col-5">
            <FormInput
              label="Admin"
              value={this.state.access}
              selectValues={[
                { id: 1, name: "Basic User" },
                { id: 2, name: "Super Admin" }
              ]}
              target="access"
              selectObjProp="id"
              selectObjLabel="name"
              handleChange={this.handleChange}
              required={!this.state.access}
            />
          </div>
          <div className="col-5 offset-md-1"></div>
        </div>

        <div className="d-flex mt-40 justify-content-end">
          <Button
            variant="contained"
            className="btn-success text-white"
            onClick={
              this.props.edit ? this.handleEditForm : this.handleSubmitForm
            }
            disabled={this.checkDisable()}
          >
            Save
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(null, { addUser, editUser })(AddUserForm);
