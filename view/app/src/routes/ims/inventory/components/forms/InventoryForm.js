import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RctSectionLoader from "Components/RctSectionLoader";

// Form Layout
import FormWrapper from "Components/Form/Layout/FormWrapper";
import { InventoryInformation } from "./Layout";

// Input Components
import FormInput from "Components/Form/FormInput";

// Actions
import { getWarehouse, getCategories } from "Ducks/ims/fields";

const initialState = {
  item: {
    name: "",
    price: 0,
    code: "",
    material: "",
    cid: "",
    unit_code: "",
    quantity: 0,
    perbox: 0,
    rack: "",
    wid: "",
    description: ""
  }
};

class InventoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleInv = this.handleInv.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSaveNew = this.onSaveNew.bind(this);
  }

  componentDidMount() {
    this.props.getWarehouse();
    this.props.getCategories();
    if (this.props.edit) this.setState({ item: this.props.edit });
  }

  handleInv(field, value) {
    this.setState(prevState => ({
      ...prevState,
      item: {
        ...prevState.item,
        [field]: value
      }
    }));
  }

  onSubmit() {
    this.props.handleSubmit(this.state.item, true, this.props.history);
  }

  onSaveNew() {
    this.props.handleSubmit(this.state.item, false);
    this.setState(initialState);
  }

  checkDisabled() {
    const disabled =
      this.state.item.name && this.state.item.quantity && this.state.item.cid;
    return disabled;
  }

  render() {
    const { categories, warehouse, loading } = this.props;
    const { edit, title } = this.props;
    const { item } = this.state;
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
          <InventoryInformation
            name={
              <FormInput
                label="Name"
                value={item.name}
                target="name"
                handleChange={this.handleInv}
                required={!item.name}
              />
            }
            code={
              <FormInput
                label="Code"
                value={item.code}
                target="code"
                handleChange={this.handleInv}
              />
            }
            warehouse={
              <FormInput
                label="Warehouse"
                value={item.wid ? item.wid : ""}
                selectValues={warehouse}
                target="wid"
                selectObjProp="wid"
                selectObjLabel="wh_name"
                handleChange={this.handleInv}
              />
            }
            rack={
              <FormInput
                label="Rack"
                value={item.rack}
                target="rack"
                handleChange={this.handleInv}
              />
            }
            material={
              <FormInput
                label="Material"
                value={item.material}
                target="material"
                handleChange={this.handleInv}
              />
            }
            category={
              <FormInput
                label="Category"
                value={item.cid ? item.cid : ""}
                selectValues={categories}
                target="cid"
                selectObjProp="cid"
                selectObjLabel="cat_name"
                handleChange={this.handleInv}
                required={!item.cid}
              />
            }
            quantity={
              <FormInput
                type="number"
                label="Quantity"
                value={item.quantity}
                target="quantity"
                handleChange={this.handleInv}
                required={!item.quantity}
              />
            }
            perbox={
              <FormInput
                type="number"
                label="Qty per Box"
                value={item.perbox}
                target="perbox"
                handleChange={this.handleInv}
              />
            }
            unit_code={
              <FormInput
                label="Unit Code"
                value={item.unit_code}
                target="unit_code"
                handleChange={this.handleInv}
              />
            }
            description={
              <FormInput
                multiline
                rows={4}
                label="Description"
                value={item.description}
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
  const { imsField, inventoryState } = imsState;
  const { categories, warehouse } = imsField;
  const { inventoryForm } = inventoryState;
  const { loading } = inventoryForm;
  return { categories, warehouse, loading };
};

export default withRouter(
  connect(mapStateToProps, {
    getWarehouse,
    getCategories
  })(InventoryForm)
);
