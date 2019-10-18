import React, { Component } from "react";
import { connect } from "react-redux";

// sub components
import { Helmet } from "react-helmet";

import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

class Homebase extends Component {
  render() {
    const { name } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Dashboard</title>
        </Helmet>
        <PageTitleBar title={`Hello ${name},`} noBack />
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4"></div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { name } = authState.loggedInUser;
  return { name };
};

export default connect(mapStateToProps)(Homebase);
