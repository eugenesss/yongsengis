import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";

// horizontal layout
import AppContainer from "./layoutContainer";

// Init Modules
import moduleInit from "Services/_moduleInitialise";

// redux action
import { getCurrentUser } from "Ducks/session/auth";

class HorizontalContainer extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  render() {
    const { match, location } = this.props;
    if (location.pathname === "/") {
      return <Redirect to={"/app/dashboard"} />;
    }

    return (
      <AppContainer>
        {moduleInit &&
          moduleInit.map((route, key) => (
            <Route
              key={key}
              path={`${match.url}/${route.path}`}
              component={route.component}
            />
          ))}
      </AppContainer>
    );
  }
}

export default withRouter(
  connect(
    null,
    { getCurrentUser }
  )(HorizontalContainer)
);
