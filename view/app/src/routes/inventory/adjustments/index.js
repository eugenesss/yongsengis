import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import AdjustmentForm from "../../../components/Forms/Inventory/AdjumentForm.js";

class InventoryAdjustments extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Inventory Adjustments</title>
        </Helmet>
        <RctCollapsibleCard heading="Adjust Inventory Count">
          <AdjustmentForm />
        </RctCollapsibleCard>
      </React.Fragment>
    );
  }
}

export default InventoryAdjustments;
