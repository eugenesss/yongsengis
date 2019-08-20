import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

// Form Compnnets
import FormTable from "Components/Forms/Components/FormTable";
import FormBlock from "Components/Forms/Components/FormBlock";
import DescriptionFormInput from "Components/Forms/Components/DescriptionFormInput";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

// Actions
import { handleInvFormChange, getWarehouse, getCategories } from "Actions";
import AccessComponent from "Components/AccessComponent";

class InventoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.onSaveNew = this.onSaveNew.bind(this);
    this.onCancel = this.onCancel.bind(this);
    if (this.props.edit) this.state = { item: { ...this.props.edit } };
  }
  componentDidMount() {
    this.props.getWarehouse();
    this.props.getCategories();
  }

  handleChange(field, value) {
    this.setState({
      ...this.state,
      item: { ...this.state.item, [field]: value }
    });
  }

  onSubmit() {
    this.props.handleSubmit(this.state.item, true);
  }

  onSaveNew() {
    this.props.handleSubmit(this.state.item, false);
  }

  onCancel() {
    this.props.handleCancel();
  }

  isDisabled() {
    var disabled =
      this.state.item.name != "" &&
      this.state.item.wid != "" &&
      this.state.item.material != "" &&
      this.state.item.cid != "" &&
      this.state.item.code != "";
    return disabled;
  }

  render() {
    const { loading } = this.props.inventoryForm;
    const {
      name,
      price,
      code,
      material,
      cid,
      unit_code,
      quantity,
      perbox,
      rack,
      wid,
      description
    } = this.state.item;
    return (
      <React.Fragment>
        {loading && <RctSectionLoader />}
        <FormTable>
          <TableRow>
            <FormBlock
              value={name}
              handleChange={e => this.handleChange("name", e.target.value)}
              required
              label="Name"
            />
            <FormBlock
              value={code}
              handleChange={e => this.handleChange("code", e.target.value)}
              required
              label="Product Code"
            />
          </TableRow>
          <TableRow>
            <FormBlock
              value={material}
              handleChange={e => this.handleChange("material", e.target.value)}
              label="Material"
              required
            />
            <FormBlock
              value={cid}
              handleChange={e => this.handleChange("cid", e.target.value)}
              label="Category"
              selectValues={this.props.categories}
              objProp="cid"
              objLabel="cat_name"
              required
            />
          </TableRow>
          <TableRow>
            <FormBlock
              value={unit_code}
              handleChange={e => this.handleChange("unit_code", e.target.value)}
              label="Unit Code"
            />
            <FormBlock
              value={quantity}
              handleChange={e => this.handleChange("quantity", e.target.value)}
              label="Quantity"
              numberInput
            />
          </TableRow>
          <TableRow>
            <FormBlock
              value={perbox}
              handleChange={e => this.handleChange("perbox", e.target.value)}
              label="Qty Per Box"
              numberInput
            />
            <FormBlock empty />
          </TableRow>
          <TableRow>
            <FormBlock
              value={rack}
              handleChange={e => this.handleChange("rack", e.target.value)}
              label="Rack"
            />
            <FormBlock
              value={wid}
              handleChange={e => this.handleChange("wid", e.target.value)}
              label="Warehouse"
              selectValues={this.props.warehouse}
              objProp="wid"
              objLabel="wh_name"
              required
            />
          </TableRow>
          <DescriptionFormInput
            handleChange={e => this.handleChange("description", e.target.value)}
            description={description}
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
const mapStateToProps = ({
  inventoryState,
  warehouseState,
  categoriesState
}) => {
  const { inventoryForm } = inventoryState;
  const { warehouse } = warehouseState;
  const { categories } = categoriesState;
  return { inventoryForm, warehouse, categories };
};

export default connect(
  mapStateToProps,
  { handleInvFormChange, getWarehouse, getCategories }
)(InventoryForm);
