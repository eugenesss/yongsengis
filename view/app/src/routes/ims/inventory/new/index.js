import React from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

// Page Components
import InventoryForm from "../components/forms/InventoryForm";

// Actions
import { submitInventory } from "Ducks/ims/inventory";

const ims_inventory_new = props => (
  <React.Fragment>
    <Helmet>
      <title>YSIS | New Inventory</title>
    </Helmet>
    <InventoryForm
      title="sidebar.newInventory"
      handleSubmit={props.submitInventory}
    />
  </React.Fragment>
);

export default connect(
  null,
  { submitInventory }
)(ims_inventory_new);
