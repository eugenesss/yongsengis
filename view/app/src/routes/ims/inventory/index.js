import React, { Component } from "react";
import { show } from "redux-modal";
import { connect } from "react-redux";
//Sub Components
import InventoryList from "./components/InventoryList";
//Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// List View
import ListViewSelector from "Components/PageTitleBar/ListViewSelector";
// Actions
import {
  getAllInventory,
  changeInvList,
  deleteInventory
} from "Ducks/ims/inventory";

class ims_inventory extends Component {
  constructor(props) {
    super(props);
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillMount() {
    this.props.getAllInventory();
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
  delete(id) {
    this.props.deleteInventory(id);
  }

  refresh() {
    console.log("refresh");
  }

  render() {
    const {
      options,
      nowShowing,
      action,
      tableData,
      loading
    } = this.props.inventoryList;
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Inventory</title>
          <meta name="description" content="YSIS Inventory List" />
        </Helmet>
        <PageTitleBar
          title={nowShowing}
          actionGroup={{
            // add: { onClick: this.newLead },
            // mid: { label: "Import", onClick: this.importLead },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        <InventoryList
          title={
            <ListViewSelector
              options={options}
              nowShowing={nowShowing}
              onChangeValue={this.props.changeInvList}
            />
          }
          tableData={tableData}
          loading={loading}
          handleEdit={this.handleEdit}
          handleView={this.handleView}
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ imsState }) => {
  const { inventoryState } = imsState;
  const { inventoryList } = inventoryState;
  return { inventoryList };
};

export default connect(
  mapStateToProps,
  {
    getAllInventory,
    show,
    changeInvList,
    deleteInventory
  }
)(ims_inventory);
