import React, { Component } from "react";

// sub components
import { Helmet } from "react-helmet";

import BgCard from "Components/BgCard";

// widgets
import TodoList from "Components/Widgets/TodoList";
// import StockCount from "Components/Widgets/StockCount";

class Homebase extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Dashboard</title>
        </Helmet>
        <div className="row">
          <div className="col-md-7">{/* <StockCount /> */}</div>
          <div className="col-md-5">
            <TodoList />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <BgCard>recent flow of loctite</BgCard>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <BgCard>warehouse inventory health</BgCard>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homebase;
