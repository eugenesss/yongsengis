import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

import RctSectionLoader from "Components/RctSectionLoader";
import { Details } from "@material-ui/icons";
import { Button } from "@material-ui/core";
// Components
import PageErrorMsg from "Components/Error/PageErrorMessage";
import TabsWrapper from "Components/Tabs/TabsWrapper";
// Inventory
import InventoryCard from "../components/InventoryCard";
import InventoryDetails from "../components/InventoryDetails";

import { getInventory } from "Ducks/ims/inventory";

class ims_inventory_view extends Component {
  componentDidMount() {
    var id = this.props.itemID;
    this.props.getInventory(id);
  }
  render() {
    const { show, handleHide, handleEdit, handleDelete } = this.props;
    const { item, loading } = this.props.itemToView;
    return (
      <DialogRoot
        show={show}
        handleHide={handleHide}
        title="View Inventory"
        size="lg"
      >
        {loading ? (
          <RctSectionLoader />
        ) : item ? (
          <div className="row">
            <div className="col-md-3">
              <div>
                <InventoryCard
                  name={item.name}
                  image={item.file}
                  category={item.cat_name}
                />
              </div>
              <Button
                variant="outlined"
                color="primary"
                className="my-10 w-100"
                onClick={() => handleEdit(item.pid)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                className="border-danger text-danger my-10 w-100"
                onClick={() => handleDelete(item.pid)}
              >
                Delete
              </Button>
            </div>
            <div className="col-md-9">
              <TabsWrapper>
                <div label="Details" icon={<Details fontSize="small" />}>
                  <InventoryDetails item={item} />
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
  const { itemToView } = imsState.inventoryState;
  return { itemToView };
};

export default connect(mapStateToProps, { getInventory })(
  connectModal({ name: "view_inventory" })(ims_inventory_view)
);
