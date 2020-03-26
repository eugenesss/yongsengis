import React, { Component } from "react";
import { show } from "redux-modal";
import { connect } from "react-redux";
//Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import ListViewSelector from "Components/PageTitleBar/ListViewSelector";

import InventoryList from "./components/InventoryList";

// View Dialog
import ShowInventory from "./view";
import EditInventory from "./edit";

import {
  inventoryNewPage,
  inventoryMassUpdatePage,
  inventoryImportPage
} from "Helpers/imsURL";
// Actions
import {
  getAllInventory,
  changeInvList,
  deleteInventory
} from "Ducks/ims/inventory";
// get warehouse
import { getWarehouse } from "Ducks/ims/fields";

class ims_inventory_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invView: false,
      invToView: {}
    };
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.newInv = this.newInv.bind(this);
    this.massUpdate = this.massUpdate.bind(this);
    this.importInv = this.importInv.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }
  componentDidMount() {
    this.props.getAllInventory();
    this.props.getWarehouse();
  }
  handleEdit(itemToEdit) {
    this.props.show("edit_inventory", { itemToEdit });
  }
  handleView(itemID) {
    this.props.show("view_inventory", { itemID });
  }
  handleDelete(itemID, name) {
    this.props.show("alert_delete", {
      name: name,
      action: () => this.delete(itemID)
    });
  }
  newInv() {
    this.props.history.push(inventoryNewPage);
  }
  massUpdate() {
    this.props.history.push(inventoryMassUpdatePage);
  }
  delete(id) {
    this.props.deleteInventory(id);
  }
  importInv() {
    this.props.history.push(inventoryImportPage);
  }

  renderOptions() {
    let options = [
      { wh_name: "All Inventory", wid: "" },
      ...this.props.warehouse
    ];
    return options;
  }

  render() {
    const { nowShowing, tableData, loading } = this.props.inventoryList;
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Inventory</title>
          <meta name="description" content="YSIS Inventory List" />
        </Helmet>
        <PageTitleBar
          title={nowShowing}
          actionGroup={{
            add: { onClick: this.newInv },
            mid: { label: "Mass Update", onClick: this.massUpdate },
            more: [
              { label: "Import Inventory", onClick: this.importInv },
              { label: "Refresh List", onClick: this.refresh }
            ]
          }}
        />
        <BgCard>
          {loading && <RctSectionLoader />}
          <InventoryList
            title={
              <ListViewSelector
                options={this.renderOptions()}
                nowShowing={nowShowing}
                onChangeValue={this.props.changeInvList}
                optValue="wid"
                optLabel="wh_name"
              ></ListViewSelector>
            }
            tableData={tableData}
            handleView={this.handleView}
          />
        </BgCard>
        <ShowInventory
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
        <EditInventory />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ imsState }) => {
  const { inventoryState, imsField } = imsState;
  const { inventoryList } = inventoryState;
  const { warehouse } = imsField;
  return { inventoryList, warehouse };
};

export default connect(mapStateToProps, {
  getAllInventory,
  show,
  changeInvList,
  deleteInventory,
  getWarehouse
})(ims_inventory_list);
