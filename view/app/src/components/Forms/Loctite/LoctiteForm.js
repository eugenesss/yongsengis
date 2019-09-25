import React, { Component } from "react";

// Form Components
import FormTable from "Components/Forms/Components/FormTable";
import FormBlock from "Components/Forms/Components/FormBlock";
import DescriptionFormInput from "Components/Forms/Components/DescriptionFormInput";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import AccessComponent from "Components/AccessComponent";

import moment from "moment";

const initialState = {
  name: "",
  quantity: 0,
  description: "",
  batch: "",
  price: 0,
  expiry_date: moment().format("YYYY-MM-DD"),
  file: ""
};

class LoctiteForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.onSaveNew = this.onSaveNew.bind(this);
    this.onCancel = this.onCancel.bind(this);
    if (this.props.edit) this.state = { ...this.props.edit };
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  onSubmit() {
    this.props.handleSubmit(this.state, true);
  }
  onSaveNew() {
    this.props.handleSubmit(this.state, false);
  }
  onCancel() {
    this.props.handleCancel();
  }

  isDisabled() {
    var disabled = this.state.name != "" && this.state.batch != "";
    return disabled;
  }

  render() {
    const {
      name,
      quantity,
      description,
      batch,
      price,
      expiry_date,
      file
    } = this.state;
    return (
      <React.Fragment>
        <FormTable>
          <TableRow>
            <FormBlock
              value={name}
              handleChange={e => this.handleChange("name", e.target.value)}
              required
              label="Name"
            />
            <FormBlock
              value={quantity}
              handleChange={e => this.handleChange("quantity", e.target.value)}
              required
              label="Quantity"
              numberInput
            />
          </TableRow>
          <TableRow>
            <FormBlock
              value={batch}
              handleChange={e => this.handleChange("batch", e.target.value)}
              required
              label="Batch No."
            />
            <FormBlock
              value={moment(expiry_date).format("YYYY-MM-DD")}
              handleChange={e =>
                this.handleChange("expiry_date", e.target.value)
              }
              required
              label="Expiry Date"
              type="date"
            />
          </TableRow>

          <DescriptionFormInput
            description={description}
            handleChange={e => this.handleChange("description", e.target.value)}
          />
        </FormTable>
        <AccessComponent>
          <div className="row justify-content-end mt-30">
            <div className="col-md-4">
              <div className="d-flex justify-content-end">
                <Button
                  className="text-white mr-15"
                  color="default"
                  onClick={() => this.onCancel()}
                  variant="contained"
                >
                  Cancel
                </Button>
                {this.props.handleSaveNew && (
                  <Button
                    disabled={this.isDisabled()}
                    onClick={() => this.onSaveNew()}
                    className="bg-success text-white mr-15"
                    variant="contained"
                  >
                    Save and new
                  </Button>
                )}
                <Button
                  disabled={!this.isDisabled()}
                  onClick={() => this.onSubmit()}
                  className="bg-success text-white"
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </AccessComponent>
      </React.Fragment>
    );
  }
}

export default LoctiteForm;
