import React, { Component } from "react";

// sub components
import { Helmet } from "react-helmet";

// widgets
import TodoList from "Components/Widgets/TodoList";
import StockInOut from "Components/Widgets/StockInOut";
import InvStockCount from "Components/Widgets/StockCount/Inventory";
import LocStockCount from "Components/Widgets/StockCount/Loctite";

class Homebase extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Dashboard</title>
        </Helmet>
        <div className="row">
          <div className="col-md-7">
            <StockInOut />
          </div>
          <div className="col-md-5">
            <TodoList />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <InvStockCount />
          </div>
          <div className="col-md-6">
            <LocStockCount />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homebase;
