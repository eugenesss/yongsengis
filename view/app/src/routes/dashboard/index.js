import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

//Components
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

export default class EcommerceDashboard extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="saas-dashboard">
        <Helmet>
          <title>YSIS | Dashboard</title>
          <meta name="description" content="YSIS Dashboard" />
        </Helmet>
        <PageTitleBar title="Dashboard" match={match} />
        <div className="row">
          <div className="col-md-6">
            <RctCollapsibleCard heading="Upcoming ">table</RctCollapsibleCard>
          </div>
        </div>
      </div>
    );
  }
}
