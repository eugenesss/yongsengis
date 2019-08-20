import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";

// horizontal layout
import RctHorizontalLayout from "Components/RctHorizontalLayout";

// router service
import routerService from "../services/_routerService";
import { getCurrentUser } from "Actions";

class RctHorizontalApp extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  render() {
    const { match, location } = this.props;
    if (location.pathname === "/app") {
      return <Redirect to={"/app/dashboard"} />;
    }
    return (
      <RctHorizontalLayout>
        {routerService &&
          routerService.map((route, key) => (
            <Route
              key={key}
              path={`${match.url}/${route.path}`}
              component={route.component}
            />
          ))}
      </RctHorizontalLayout>
    );
  }
}

export default withRouter(
  connect(
    null,
    { getCurrentUser }
  )(RctHorizontalApp)
);
