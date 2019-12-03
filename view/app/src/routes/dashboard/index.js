import React, { Component } from "react";

// sub components
import { Helmet } from "react-helmet";

import BgCard from "Components/BgCard";

class Homebase extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Dashboard</title>
        </Helmet>
        <div className="row">
          <div className="col-md-6">
            <BgCard>zero stock count</BgCard>
          </div>
          <div className="col-md-6">
            <BgCard>in/out flow of loctite</BgCard>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <BgCard>NoticeBoard</BgCard>
          </div>
          <div className="col-md-6">
            <BgCard>warehouse inventory health</BgCard>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homebase;
