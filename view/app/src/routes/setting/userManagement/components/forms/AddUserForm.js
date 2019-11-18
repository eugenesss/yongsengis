import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

// Form Inputs
import FormInput from "Components/Form/FormInput";

import { addUser } from "Ducks/setting/userManagement";

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      mobile: "",
      password: "",
      confirmPassword: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleSubmitForm() {
    const newUser = {
      ...this.state,
      name: `${this.state.firstName} ${this.state.lastName}`
    };
    this.props.addUser(newUser);
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      mobile,
      confirmPassword
    } = this.state;
    return (
      <form autoComplete="off">
        <h3 style={{ marginLeft: 35 }}>User Contact Details</h3>
        <div className="row mb-20 justify-content-center">
          <div className="col-5">
            <FormInput
              label="First Name"
              value={firstName}
              required={!firstName}
              target="firstName"
              handleChange={this.handleChange}
            />
            <FormInput
              label="Mobile"
              value={mobile}
              target="mobile"
              handleChange={this.handleChange}
            />
          </div>
          <div className="col-5 offset-md-1">
            <FormInput
              label="Last Name"
              value={lastName}
              required={!lastName}
              target="lastName"
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <h3 style={{ marginLeft: 35 }}>Login Details</h3>
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

        <div className="d-flex mt-40 justify-content-end">
          <Button
            variant="contained"
            className="btn-success text-white"
            onClick={this.handleSubmitForm}
            disabled={
              !firstName ||
              !lastName ||
              !this.validateEmail(email) ||
              !password ||
              password !== confirmPassword
            }
          >
            Create
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(null, { addUser })(AddUserForm);
