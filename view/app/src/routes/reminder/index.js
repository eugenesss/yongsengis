import React, { Component } from "react";
import { connect } from "react-redux";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";

class Reminders extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    return (
      <div className="saas-dashboard">
        <Helmet>
          <title>Everyday | Reminders</title>
          <meta name="description" content="Set Useful Reminders Everyday" />
        </Helmet>
        <PageTitleBar
          title={<IntlMessages id="sidebar.reminders" />}
          match={match}
        />
      </div>
    );
  }
}

export default Reminders;
