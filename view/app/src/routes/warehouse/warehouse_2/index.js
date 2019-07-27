import React, { Component } from "react";
import { Helmet } from "react-helmet";

// Components
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import InventoryList from "Components/Inventory/InventoryList";

class WareHouse2List extends Component {
  state = {};
  reloadTable() {
    console.log("reload");
  }

  render() {
    const data = [];
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Warehouse Two</title>
        </Helmet>
        <RctCollapsibleCard fullBlock>
          <InventoryList data={data} reloadTable={this.reloadTable} />
        </RctCollapsibleCard>
      </React.Fragment>
    );
  }
}

export default WareHouse2List;
