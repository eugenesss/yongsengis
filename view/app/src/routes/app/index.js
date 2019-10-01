import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { connect } from "react-redux";

// rct theme provider
import RctThemeProvider from "./RctThemeProvider";

//Horizontal Layout
import HorizontalLayout from "./HorizontalLayout";
import Login from "Routes/login";

import NotFound from ".components/error_pages/Err404";

import SystemDialogs from "Components/Everyday/SystemDialogs";

function App(props) {
  const { match, user } = props;

  return (
    <RctThemeProvider>
      <NotificationContainer />
      <SystemDialogs />
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
        <Route path={`/login`} component={Login} />

        <Route component={NotFound} />
      </Switch>
    </RctThemeProvider>
  );
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user } = authUser;
  return { user };
};

// export default App;

export default connect(mapStateToProps)(App);
