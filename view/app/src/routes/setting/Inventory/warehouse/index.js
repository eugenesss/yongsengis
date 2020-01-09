import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import RctSectionLoader from "Components/RctSectionLoader";
import WarehouseList from "./components/WarehouseList";

// Action
import {
  getAllWarehouse,
  editWarehouse,
  newWarehouse,
  deleteWarehouse
} from "Ducks/setting/inventory/warehouse";
import WarehouseForm from "./components/WarehouseForm";

class Setting_Warehouse extends Component {
  constructor(props) {
    super(props);
    this.openNewDialog = this.openNewDialog.bind(this);
    this.openEditDialog = this.openEditDialog.bind(this);
    this.deleteDialog = this.deleteDialog.bind(this);
  }
  componentDidMount() {
    this.props.getAllWarehouse();
  }

  openNewDialog() {
    this.props.show("warehouse_form", { submitForm: this.props.newWarehouse });
  }

  openEditDialog(id) {
    const editWh = this.props.allWarehouse.find(
      warehouse => warehouse.wid == id
    );
    this.props.show("warehouse_form", {
      edit: editWh,
      submitForm: this.props.editWarehouse
    });
  }

  deleteDialog(id) {
    this.props.show("alert_delete", {
      name: "",
      action: () => this.props.deleteWarehouse(id)
    });
  }

  render() {
    const { allWarehouse, loading } = this.props;
    return (
      <React.Fragment>
        {loading && <RctSectionLoader />}
        <WarehouseList
          data={allWarehouse}
          newWh={this.openNewDialog}
          editWh={this.openEditDialog}
          deleteWh={this.deleteDialog}
        />
        <WarehouseForm />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ settingState }) => {
  const { warehouseState } = settingState;
  const { allWarehouse, loading } = warehouseState;
  return { allWarehouse, loading };
};

export default connect(mapStateToProps, {
  show,
  getAllWarehouse,
  editWarehouse,
  newWarehouse,
  deleteWarehouse
})(Setting_Warehouse);
