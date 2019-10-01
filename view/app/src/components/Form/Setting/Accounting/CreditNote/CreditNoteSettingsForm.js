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

class CreditNoteSettingsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Form>
        <Row form>
          <Col md={6}>
            <TextField
              id="creditNoteNumberPrefix"
              label="Credit Note Number Prefix"
              className={classes.textField}
              value={"CN-"}
              //onChange={(e) => handleChange('oldPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={6}>
            <TextField
              id="nextCreditNoteNumber"
              label="Next Credit Note Number"
              className={classes.textField}
              value={"2"}
              //onChange={(e) => handleChange('newPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Col>
        </Row>
        <Row form>
          <Col>
            <FormControlLabel
              control={
                <Switch
                  id="decrementCreditNoteNumberOnDelete"
                  className={classes.textField}
                  color="primary"
                  //checked={this.state.checkedA}
                  //onChange={this.handleChange('checkedA')}
                  //value="checkedA"
                />
              }
              label="Decrement Credit Note Number on Delete"
            />
          </Col>
        </Row>
        <Row form className={classes.fullWidth}>
          <TextField
            fullWidth
            id="predefinedClientNote"
            label="Predefined Client Note"
            className={classes.textField}
            value={""}
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row form className={classes.fullWidth}>
          <TextField
            fullWidth
            id="predefinedTermsAndConditions"
            label="Predefined Terms and Conditions"
            className={classes.textField}
            value={"Subject to Sales"}
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
          />
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

CreditNoteSettingsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(withStyles(styles)(CreditNoteSettingsForm));
