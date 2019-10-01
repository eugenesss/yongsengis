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

class QuotationSettingsForm extends Component {
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
              id="quotationNumberPrefix"
              label="Quotation Number Prefix"
              className={classes.textField}
              value={"QUO-"}
              //onChange={(e) => handleChange('oldPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={4}>
            <TextField
              id="nextQuotationNumber"
              label="Next Quotation Number"
              className={classes.textField}
              value={"10"}
              //onChange={(e) => handleChange('newPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={4}>
            <TextField
              id="quotationDueAfter"
              label="Quotation Due After (Days)"
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
            <FormLabel component="legend">Quotation Number Format</FormLabel>
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
              label="Require Client to be Logged In to View Quotation"
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
              label="Delete Quotation Allowed Only on Last Invoice"
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
              label="Decrement Quotation Number on Delete"
            />
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="requireIndentityConfirmation"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Require Identity Confirmation on Accept"
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
              label="Show Sale Agent on Quotation"
            />
          </Col>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="autoConvert"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Auto Convert Quotation to Invoice After Client Accepts"
            />
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormControlLabel
              control={
                <Switch
                  id="excludeQuotationWithDraft"
                  className={classes.textField}
                  color="primary"
                />
              }
              label="Exclude Quotations with Draft Status from Customers"
            />
          </Col>
        </Row>
        <Row form className={"align-items-center"}>
          <Col md={4}>
            <TextField
              id="pipelineLimit"
              label="Pipeline Limit per Status"
              className={classes.textField}
              value={"50"}
              //onChange={(e) => handleChange('oldPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Col>
          <Col md={4}>
            <TextField
              id="pipelineSort"
              label="Pipeline Sort"
              select
              className={classes.textField}
              value={"1"}
              //onChange={(e) => handleChange('newPassword', e.target.value)}
              margin="normal"
              variant="outlined"
            >
              <MenuItem key={"1"} value={"1"}>
                Date Created
              </MenuItem>
              <MenuItem key={"2"} value={"2"}>
                Quotation Date
              </MenuItem>
              <MenuItem key={"3"} value={"3"}>
                Pipeline Order
              </MenuItem>
              <MenuItem key={"4"} value={"4"}>
                Expiry Date
              </MenuItem>
            </TextField>
          </Col>
          <Col md={4}>
            <RadioGroup aria-label="position" name="position" row>
              <FormControlLabel
                value="top"
                control={<Radio color="primary" />}
                label="Ascending"
                labelPlacement="end"
              />
              <FormControlLabel
                value="start"
                control={<Radio color="primary" />}
                label="Descending"
                labelPlacement="end"
              />
            </RadioGroup>
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

QuotationSettingsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(withStyles(styles)(QuotationSettingsForm));
