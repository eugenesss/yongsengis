import React, { Component } from "react";

// Form Compnnets
import FormTable from "Components/Forms/Components/FormTable";
import FormBlock from "Components/Forms/Components/FormBlock";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class NewUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, value) {
    this.setState({
      ...this.state,
      user: { ...this.state.user, [field]: value }
    });
  }

  handleSubmit() {
    console.log("submit");
  }

  render() {
    const { firstName, lastName, email, userName, password } = this.state.user;
    return (
      <FormTable>
        <TableRow>
          <FormBlock
            value={firstName}
            handleChange={e => this.handleChange("firstName", e.target.value)}
            required
            label="First Name"
          />
          <FormBlock
            value={lastName}
            handleChange={e => this.handleChange("lastName", e.target.value)}
            required
            label="Last Name"
          />
        </TableRow>
        <TableRow>
          <FormBlock
            value={email}
            handleChange={e => this.handleChange("email", e.target.value)}
            label="Email"
          />
        </TableRow>
        <TableRow>
          <FormBlock
            value={userName}
            handleChange={e => this.handleChange("userName", e.target.value)}
            label="Username"
          />
          <FormBlock
            value={password}
            handleChange={e => this.handleChange("password", e.target.value)}
            label="Password"
          />
        </TableRow>
      </FormTable>
    );
  }
}

export default NewUserForm;
