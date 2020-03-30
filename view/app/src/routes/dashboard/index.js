import React, { Component } from "react";

// sub components
import { Helmet } from "react-helmet";

import BgCard from "Components/BgCard";

// widgets
import TodoList from "Components/Widgets/TodoList";
import StockInOut from "Components/Widgets/StockInOut";
import LowStockCount from "Components/Widgets/LowStockCount";

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
          <div className="col-md-12">
            <LowStockCount />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homebase;
