import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RctSectionLoader from "Components/RctSectionLoader";
import moment from "moment";

// Form Layout
import FormWrapper from "Components/Form/Layout/FormWrapper";
import { LoctiteInformation } from "./Layout";

// Input Components
import FormInput from "Components/Form/FormInput";
import DatePickerInput from "Components/Form/Pickers/DatePicker";

const initialState = {
  loctite: {
    name: "",
    quantity: 0,
    description: "",
    batch: "",
    price: 0,
    expiry_date: moment().format("YYYY-MM-DD"),
    file: ""
  }
};

class LoctiteForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleInv = this.handleInv.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSaveNew = this.onSaveNew.bind(this);
  }

  componentDidMount() {
    if (this.props.edit) this.setState({ loctite: this.props.edit });
  }

  handleInv(field, value) {
    this.setState(prevState => ({
      ...prevState,
      loctite: {
        ...prevState.loctite,
        [field]: value
      }
    }));
  }

  onSubmit() {
    this.props.handleSubmit(this.state.loctite, true, this.props.history);
  }

  onSaveNew() {
    this.props.handleSubmit(this.state.loctite, false);
    this.setState(initialState);
  }

  checkDisabled() {
    const disabled = this.state.loctite.name && this.state.loctite.quantity;
    return disabled;
  }

  render() {
    const { loading } = this.props;
    const { edit, title } = this.props;
    const { loctite } = this.state;
    return (
      <FormWrapper
        onSave={this.onSubmit}
        onSaveNew={this.onSaveNew}
        disabled={this.checkDisabled()}
        edit={edit}
        title={title}
      >
        {loading && <RctSectionLoader />}
        <form autoComplete="off">
          <hr />
          <LoctiteInformation
            // file,
            name={
              <FormInput
                label="Name"
                value={loctite.name}
                target="name"
                handleChange={this.handleInv}
                required={!loctite.name}
              />
            }
            batch={
              <FormInput
                label="Batch"
                value={loctite.batch}
                target="batch"
                handleChange={this.handleInv}
              />
            }
            price={
              <FormInput
                label="Price"
                value={loctite.price}
                target="price"
                handleChange={this.handleInv}
              />
            }
            expiry_date={
              <DatePickerInput
                label="Expiry Date"
                value={loctite.expiry_date}
                required={!loctite.expiry_date}
                target="expiry_date"
                handleChange={this.handleInv}
              />
            }
            quantity={
              !edit && (
                <FormInput
                  type="number"
                  label="Quantity"
                  value={loctite.quantity}
                  target="quantity"
                  handleChange={this.handleInv}
                  required={!loctite.quantity}
                />
              )
            }
            description={
              <FormInput
                multiline
                rows={4}
                label="Description"
                value={loctite.description}
                target="description"
                handleChange={this.handleInv}
              />
            }
          />
          <hr />
        </form>
      </FormWrapper>
    );
  }
}
const mapStateToProps = ({ imsState }) => {
  const { loctiteState } = imsState;
  const { loctiteForm } = loctiteState;
  const { loading } = loctiteForm;
  return { loading };
};

export default withRouter(connect(mapStateToProps)(LoctiteForm));
