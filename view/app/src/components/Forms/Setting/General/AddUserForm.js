import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Form } from "reactstrap";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { addUser, onChangeAddUser, getAllRoles } from "Actions";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  fullWidth: {
    margin: 0
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class AddUserForm extends Component {
  constructor(props) {
    super(props);
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  componentDidMount() {
    this.props.getAllRoles();
  }

  render() {
    const {
      classes,

      userAdd,
      roles,

      addUser,
      onChangeAddUser
    } = this.props;
    return (
      <Form>
        <Row form className={"align-items-center"}>
          <Col md={6}>
            <TextField
              value={userAdd.firstName || ""}
              required
              error={!userAdd.firstName}
              className={classes.textField}
              onChange={e => onChangeAddUser("firstName", e.target.value)}
              id="firstName"
              label="First Name"
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={6}>
            <TextField
              value={userAdd.lastName || ""}
              required
              error={!userAdd.lastName}
              className={classes.textField}
              onChange={e => onChangeAddUser("lastName", e.target.value)}
              id="lastName"
              label="Last Name"
              margin="normal"
              variant="outlined"
            />
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <TextField
              value={userAdd.email || ""}
              required
              error={!userAdd.email || !this.validateEmail(userAdd.email)}
              className={classes.textField}
              onChange={e => onChangeAddUser("email", e.target.value)}
              id="email"
              label="Email"
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={6}>
            <TextField
              value={userAdd.contact || ""}
              required
              error={!userAdd.contact}
              className={classes.textField}
              onChange={e => onChangeAddUser("contact", e.target.value)}
              id="contact"
              label="Contact"
              margin="normal"
              variant="outlined"
            />
          </Col>
        </Row>
        <Row form className={classes.fullWidth}>
          <Col md={12}>
            <InputLabel htmlFor="role" style={{ fontSize: "0.8rem" }}>
              Role
            </InputLabel>
            <Select
              error={userAdd.role.length == 0}
              style={{ height: "40px", marginTop: "-0.5rem" }}
              multiple
              input={<Input id="role" />}
              value={
                userAdd
                  ? userAdd.role.id
                    ? userAdd.role.id
                    : userAdd.role
                  : []
              }
              onChange={e => onChangeAddUser("role", e.target.value)}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(function(value) {
                    var role = roles.find(role => role.id == value);
                    return (
                      <Chip
                        key={value}
                        label={role.name}
                        className={classes.chip}
                      />
                    );
                  })}
                </div>
              )}
            >
              {roles.map(function(role) {
                return (
                  <MenuItem
                    key={role.id}
                    value={role.id}
                    disabled={role.name == "Member"}
                  >
                    <Checkbox
                      color="primary"
                      checked={
                        userAdd.role.indexOf(role.id) > -1 ||
                        role.name == "Member"
                      }
                    />
                    <ListItemText primary={role.name} />
                  </MenuItem>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row className={"justify-content-end " + classes.textField}>
          <Button
            variant="contained"
            color="primary"
            className="text-white mb-10 mt-20"
            onClick={addUser}
            disabled={
              !userAdd.firstName ||
              !userAdd.lastName ||
              !userAdd.email ||
              !this.validateEmail(userAdd.email) ||
              !userAdd.contact ||
              userAdd.role.length == 0
            }
          >
            Create
          </Button>
        </Row>
      </Form>
    );
  }
}

AddUserForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ usersState, rolesState }) => {
  const { userAdd } = usersState;
  const { roles } = rolesState;
  return { userAdd, roles };
};

export default connect(
  mapStateToProps,
  { addUser, onChangeAddUser, getAllRoles }
)(withStyles(styles)(AddUserForm));
