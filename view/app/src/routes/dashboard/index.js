import React, { Component } from "react";

// sub components
import { Helmet } from "react-helmet";

class Homebase extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Dashboard</title>
        </Helmet>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homebase;
