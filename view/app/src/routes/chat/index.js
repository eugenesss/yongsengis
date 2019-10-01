import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";


class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"saas-dashboard"}>
        <Helmet>
          <title>Everyday | Chat</title>
          <meta name="description" content="Everyday System" />
        </Helmet>
      </div>
    );
  }
}

export default connect(
  null
)(Chat);
