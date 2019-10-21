import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

import RctSectionLoader from "Components/RctSectionLoader";
import { Details } from "@material-ui/icons";
// Components
import PageErrorMsg from "Components/Error/PageErrorMessage";
import TabsWrapper from "Components/Tabs/TabsWrapper";
// Loctite details
import InventoryCard from "../../inventory/components/InventoryCard";
import LoctiteDetails from "../components/LoctiteDetails";

import { viewLoctite } from "Ducks/ims/loctite";

class ims_loctite_view extends Component {
  componentWillMount() {
    var id = this.props.itemID;
    this.props.viewLoctite(id);
  }
  render() {
    const { show, handleHide } = this.props;
    const { loctite, loading } = this.props.loctiteToView;
    return (
      <DialogRoot
        show={show}
        handleHide={handleHide}
        title="View Loctite"
        size="lg"
      >
        {loading ? (
          <RctSectionLoader />
        ) : loctite ? (
          <div className="row">
            <div className="col-md-3">
              <div>
                <InventoryCard name={loctite.name} />
              </div>
            </div>
            <div className="col-md-9">
              <TabsWrapper>
                <div label="Details" icon={<Details fontSize="small" />}>
                  <LoctiteDetails item={loctite} />
                </div>
              </TabsWrapper>
            </div>
          </div>
        ) : (
          <PageErrorMsg
            heading="Not Found"
            message="This could be because of a network problem or the record might have been deleted"
          />
        )}
      </DialogRoot>
    );
  }
}
const mapStateToProps = ({ imsState }) => {
  const { loctiteToView } = imsState.loctiteState;
  return { loctiteToView };
};

export default connect(
  mapStateToProps,
  { viewLoctite }
)(connectModal({ name: "view_loctite" })(ims_loctite_view));