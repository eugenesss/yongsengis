import React, { Component } from "react";
import { connect } from "react-redux";

// Global Req
import { Helmet } from "react-helmet";
import { show } from "redux-modal";

// Components
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import PageErrorMsg from "Components/YSIS/ErrorMsg/PageErrorMsg";
import TabsWrapper from "Components/YSIS/Tabs/TabsWrapper";
import ViewActionBox from "Components/YSIS/ViewActionBox";
import EditLoctiteModal from "Components/Loctite/EditLoctiteModal";

// actions
import { viewLoctite } from "Actions";
import LoctiteCard from "Components/Loctite/LoctiteCard";

class ViewLoctite extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentWillMount() {
    var id = this.props.match.params.id;
    this.props.viewLoctite(id);
  }

  edit(item) {
    this.props.show("edit_loctite", { itemToEdit: item.pid });
  }

  delete(item) {
    this.props.show("alert_delete", {
      name: item.name,
      action: () => this.handleDelete(item.pid)
    });
  }
  handleDelete(id) {
    console.log(`delete ${id}`);
  }

  render() {
    const { loctite, loading } = this.props.loctiteToView;
    return loading ? (
      <RctPageLoader />
    ) : loctite ? (
      <React.Fragment>
        <Helmet>
          <title>YSIS | View Loctite</title>
        </Helmet>
        <div className="row">
          <div className="col-md-3">
            <div>
              <LoctiteCard name={loctite.name} />
              <ViewActionBox>
                {{
                  label: "Edit",
                  icon: "zmdi-edit",
                  color: "primary",
                  onClick: () => this.edit(loctite)
                }}
                {{
                  label: "Delete",
                  customClasses: "bg-danger text-white",
                  color: "inherit",
                  onClick: () => this.delete(loctite)
                }}
              </ViewActionBox>
            </div>
          </div>
          <div className="col-md-9">
            <TabsWrapper>
              <div label="Details" icon="zmdi-lamp">
                details
              </div>
            </TabsWrapper>
          </div>
        </div>
        <EditLoctiteModal />
      </React.Fragment>
    ) : (
      <PageErrorMsg
        heading="Not Found"
        message="This could be because of a network problem or the record might have been deleted"
      />
    );
  }
}
const mapStateToProps = ({ loctiteState }) => {
  const { loctiteToView } = loctiteState;
  return { loctiteToView };
};

export default connect(
  mapStateToProps,
  { viewLoctite, show }
)(ViewLoctite);
