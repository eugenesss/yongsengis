import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Form } from "reactstrap";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

class QuotationReminderSettingsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Form>
        <Row form className={classes.fullWidth}>
          <Col md={6}>
            <FormControlLabel
              control={
                <Switch
                  id="expiryReminder"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Expiry Reminder"
            />
          </Col>
        </Row>
        <Row form className={classes.fullWidth}>
          <Col md={4}>
            <TextField
              id="daysBeforeExpiry"
              label="Remind Before Expiry (Days)"
              className={classes.textField}
              value={"7"}
              //onChange={(e) => handleChange('oldPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Col>
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

QuotationReminderSettingsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(withStyles(styles)(QuotationReminderSettingsForm));
