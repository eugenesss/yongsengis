/**
 * App.js Layout Start Here
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

// rct theme provider
import RctThemeProvider from "./RctThemeProvider";

//Horizontal Layout
import HorizontalLayout from "./HorizontalLayout";

// Auth
import Login from "Routes/login";
import SystemAlerts from "Components/YSIS/SystemAlerts";

class App extends Component {
  render() {
    const { location, match, user } = this.props;
    if (location.pathname === "/") {
      if (user) {
        return <Redirect to={"/app/dashboard"} />;
      } else {
        return <Redirect to={"/login"} />;
      }
    }
    return (
      <RctThemeProvider>
        <NotificationContainer />
        <SystemAlerts />
        <Switch>
          <Route
            path={`${match.url}app`}
            render={() =>
              user ? (
                <HorizontalLayout />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
          <Route
            exact
            path={"/"}
            render={() => <Redirect to={{ pathname: "/app/dashboard" }} />}
          />
          <Route exact path={`${match.url}login`} component={Login} />
          <Redirect to="/404" />
        </Switch>
      </RctThemeProvider>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user } = authUser;
  return { user };
};

export default connect(mapStateToProps)(App);
