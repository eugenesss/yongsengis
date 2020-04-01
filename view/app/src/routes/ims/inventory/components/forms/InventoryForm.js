import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RctSectionLoader from "Components/RctSectionLoader";

// Form Layout
import FormWrapper from "Components/Form/Layout/FormWrapper";
import { InventoryInformation } from "./Layout";

// Input Components
import FormInput from "Components/Form/FormInput";
import Dropzone from "Components/Dropzone";

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
  },
  imageToUpload: []
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
    if (this.props.edit) {
      this.setState({ item: this.props.edit });
    }
  }

  removeFile(file) {
    this.setState(state => {
      const index = state.imageToUpload.indexOf(file);
      const imageToUpload = state.imageToUpload.slice(0);
      imageToUpload.splice(index, 1);
      return { ...state, imageToUpload };
    });
  }
  handleUpload = file => {
    this.setState(state => ({ ...state, imageToUpload: file }));
  };

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
    let submitData;
    if (this.state.imageToUpload.length > 0) {
      var data = new FormData();
      this.state.imageToUpload.map(file => data.append("file", file));
      submitData = { ...this.state.item, file: data };
    } else {
      submitData = this.state.item;
    }
    this.props.handleSubmit(submitData, true, this.props.history);
  }
  onSaveNew() {
    this.props.handleSubmit(this.state.item, false);
    this.setState(initialState);
  }
  checkDisabled() {
    const disabled =
      this.state.item.name && this.state.item.cid && this.state.item.wid;
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
            picUpload={
              <React.Fragment>
                <small className="mt-20">Image Upload</small>
                <Dropzone
                  acceptFileTypes="image/jpeg,image/png"
                  onDrop={this.handleUpload}
                  onRemove={this.removeFile}
                  uploadedFiles={this.state.imageToUpload}
                />
                {edit && (
                  <p>
                    * Note to update image just upload another image to override
                    the current one.
                  </p>
                )}
              </React.Fragment>
            }
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
                required={!item.wid}
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
              !edit && (
                <FormInput
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  target="quantity"
                  handleChange={this.handleInv}
                  required={!item.quantity}
                />
              )
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
