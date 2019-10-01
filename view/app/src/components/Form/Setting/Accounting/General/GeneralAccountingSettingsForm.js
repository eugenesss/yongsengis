import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Form } from "reactstrap";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  fullWidth: {
    margin: 0
  }
});

class GeneralAccountingSettingsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Form>
        <Row form className={classes.fullWidth}>
          <TextField
            select
            fullWidth
            id="Invoice Template"
            label="Invoice Template"
            className={classes.textField}
            value={"1"}
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
          >
            <MenuItem key={"1"} value={"1"}>
              Design 1
            </MenuItem>
            <MenuItem key={"2"} value={"2"}>
              Design 2
            </MenuItem>
            <MenuItem key={"3"} value={"3"}>
              Design 3
            </MenuItem>
          </TextField>
        </Row>
        <Row
          form
          className={
            "justify-content-end align-items-center " + classes.textField
          }
        >
          <span>
            <Button
              variant="contained"
              color="primary"
              className="text-white mb-10"
              //onClick={handleUpdate.bind(this)}
            >
              Save Settings
            </Button>
          </span>
        </Row>
      </Form>
    );
  }
}

GeneralAccountingSettingsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(withStyles(styles)(GeneralAccountingSettingsForm));
