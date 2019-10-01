import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";

// horizontal layout
import AppLayout from "./components/AppLayout";

// router service
import routerService from "./router_service";
import { getCurrentUser } from "Ducks/session";

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
      <AppLayout>
        {routerService &&
          routerService.map((route, key) => (
            <Route
              key={key}
              path={`${match.url}/${route.path}`}
              component={route.component}
            />
          ))}
      </AppLayout>
    );
  }
}

export default withRouter(
  connect(
    null,
    { getCurrentUser }
  )(RctHorizontalApp)
);
