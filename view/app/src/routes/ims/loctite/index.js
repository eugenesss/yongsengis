import React, { Component } from "react";
import { show } from "redux-modal";
import { connect } from "react-redux";
//Sub Components
import LoctiteList from "./components/LoctiteList";
//Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// List View
import ListViewSelector from "Components/PageTitleBar/ListViewSelector";
// Actions
import { getAllLoctite, deleteLoctite } from "Ducks/ims/loctite";

class ims_loctite extends Component {
  constructor(props) {
    super(props);
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillMount() {
    this.props.getAllLoctite();
  }
  handleEdit(itemToEdit) {
    this.props.show("edit_loctite", { itemToEdit });
  }
  handleView(itemID) {
    this.props.show("view_loctite", { itemID });
  }
  handleDelete(itemID, name) {
    this.props.show("alert_delete", {
      name: name,
      action: () => this.delete(itemID)
    });
  }
  delete(id) {
    this.props.deleteLoctite(id);
  }

  refresh() {
    console.log("refresh");
  }

  render() {
    const { action, tableData, loading } = this.props.loctiteList;
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Loctite</title>
          <meta name="description" content="YSIS Locite List" />
        </Helmet>
        <PageTitleBar
          title="All Loctite"
          actionGroup={{
            // add: { onClick: this.newLead },
            // mid: { label: "Import", onClick: this.importLead },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        <LoctiteList
          tableData={tableData}
          loading={loading}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          handleView={this.handleView}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ imsState }) => {
  const { loctiteState } = imsState;
  const { loctiteList } = loctiteState;
  return { loctiteList };
};

export default connect(
  mapStateToProps,
  { getAllLoctite, show, deleteLoctite }
)(ims_loctite);
