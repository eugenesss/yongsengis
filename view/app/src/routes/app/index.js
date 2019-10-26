import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { connect } from "react-redux";

// App theme
import ThemeProvider from "./components/ThemeProvider";

//Horizontal Layout
import HorizontalContainer from "./components/HorizontalContainer";

// App level dialogs
import SystemDialogs from "Components/Everyday/SystemDialogs";

// Main Routes (App level)
import { LoginComponent } from "../session";
// import Login from "Routes/login";
// import Register from "Routes/register";
// import ForgetPassword from "Routes/forgetpassword/forgetpassword";

// Error pages
import NotFound from "./components/ErrorPages/Err404";

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 *
 */
const AppEntry = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);
function App(props) {
  const { location, match, user } = props;
  // check if user is authenticated, if not redirect to login
  if (location.pathname === "/") {
    if (user != null) {
      return <Redirect to={"/app/dashboard"} />;
    } else {
      return <Redirect to={"/login"} />;
    }
  }

  return (
    <ThemeProvider>
      <NotificationContainer />
      <SystemDialogs />
      <Switch>
        <AppEntry
          path={`${match.url}app`}
          authUser={user}
          component={HorizontalContainer}
        />
        <Route path={`/login`} exact component={LoginComponent} />
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  );
}

// map state to props
const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { user } = authState;
  return { user };
};

// export default App;

export default connect(mapStateToProps)(App);
