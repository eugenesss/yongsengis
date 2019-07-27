import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { show } from "redux-modal";

// Components
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import LoctiteList from "Components/Loctite/LoctiteList";
import EditLoctiteModal from "Components/Loctite/EditLoctiteModal";
import ViewLoctiteModal from "Components/Loctite/ViewLoctiteModal";

// Actions
import { getAllLoctite } from "Actions";

class ViewAllLoctite extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleView = this.handleView.bind(this);
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
    console.log("delete loctite");
    //this.props.deleteInventory(id);
  }

  render() {
    const { tableData, loading } = this.props.loctiteList;
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | View Loctite</title>
        </Helmet>
        <RctCollapsibleCard fullBlock>
          <LoctiteList
            data={tableData}
            loading={loading}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
            handleView={this.handleView}
          />
        </RctCollapsibleCard>
        <EditLoctiteModal />
        <ViewLoctiteModal />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ loctiteState }) => {
  const { loctiteList } = loctiteState;
  return { loctiteList };
};
export default connect(
  mapStateToProps,
  { getAllLoctite, show }
)(ViewAllLoctite);
