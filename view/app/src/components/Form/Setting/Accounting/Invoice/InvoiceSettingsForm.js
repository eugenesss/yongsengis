import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Form } from "reactstrap";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

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

class InvoiceSettingsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Form>
        <Row form>
          <Col md={4}>
            <TextField
              id="invoiceNumberPrefix"
              label="Invoice Number Prefix"
              className={classes.textField}
              value={"INV-"}
              //onChange={(e) => handleChange('oldPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={4}>
            <TextField
              id="nextInvoiceNumber"
              label="Next Invoice Number"
              className={classes.textField}
              value={"9"}
              //onChange={(e) => handleChange('newPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={4}>
            <TextField
              id="invoiceDueAfter"
              label="Invoice Due After (Days)"
              className={classes.textField}
              value={"30"}
              //onChange={(e) => handleChange('newPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Col>
        </Row>
        <Row form>
          <Col className={classes.textField + " mt-10"}>
            <FormLabel component="legend">Invoice Number Format</FormLabel>
            <RadioGroup aria-label="position" name="position" row>
              <FormControlLabel
                value="top"
                control={<Radio color="primary" />}
                label="Number Based (000001)"
                labelPlacement="end"
              />
              <FormControlLabel
                value="start"
                control={<Radio color="primary" />}
                label="Year Based (YYYY/000001)"
                labelPlacement="end"
              />
            </RadioGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="requireLoggedIn"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Require Client to be Logged In to View Invoice"
            />
          </Col>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="deleteOnlyIfLast"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Delete Invoice Allowed Only on Last Invoice"
            />
          </Col>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="decrementOnDelete"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Decrement Invoice Number on Delete"
            />
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="excludeWithDraftStatus"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Exclude Invoices with Draft Status on Customers Area"
            />
          </Col>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="showSaleAgent"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Show Sale Agent on Invoice"
            />
          </Col>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="showTotalPaid"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Show Total Amount Paid on Invoice"
            />
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="showCreditsApplied"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Show Credits Applied on Invoice"
            />
          </Col>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="showAmountDue"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Show Amount Due on Invoice"
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

InvoiceSettingsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(withStyles(styles)(InvoiceSettingsForm));
