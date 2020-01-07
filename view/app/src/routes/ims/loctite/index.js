import React, { Component } from "react";
import { show } from "redux-modal";
import { connect } from "react-redux";
//Sub Components
import LoctiteList from "./components/LoctiteList";
import ViewLoctite from "./view";
import EditLoctite from "./edit";
//Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { loctiteNewPage, loctiteMassUpdatePage } from "Helpers/imsURL";
// Actions
import { getAllLoctite, deleteLoctite } from "Ducks/ims/loctite";

class ims_loctite extends Component {
  constructor(props) {
    super(props);
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.newLoctite = this.newLoctite.bind(this);
    this.massUpdate = this.massUpdate.bind(this);
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
  newLoctite() {
    this.props.history.push(loctiteNewPage);
  }
  refresh() {
    this.props.getAllLoctite();
  }
  massUpdate() {
    this.props.history.push(loctiteMassUpdatePage);
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
            add: { onClick: this.newLoctite },
            mid: { label: "Mass Update", onClick: this.massUpdate },
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
        <ViewLoctite />
        <EditLoctite />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ imsState }) => {
  const { loctiteState } = imsState;
  const { loctiteList } = loctiteState;
  return { loctiteList };
};

export default connect(mapStateToProps, { getAllLoctite, show, deleteLoctite })(
  ims_loctite
);
