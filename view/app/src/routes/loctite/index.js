import React from "react";
import { Route, Switch } from "react-router-dom";

// async components
import {
  AsyncLoctiteComponent,
  AsyncNewLoctiteComponent,
  AsyncLoctiteAdjustComponent,
  AsyncSingleLoctiteComponent
} from "Components/AsyncComponent/AsyncComponent";

const LoctiteSwitcher = ({ match }) => (
  <div className="saas-dashboard">
    <Switch>
      <Route path={`${match.url}/all`} component={AsyncLoctiteComponent} />
      <Route path={`${match.url}/new`} component={AsyncNewLoctiteComponent} />
      <Route
        path={`${match.url}/adjustments`}
        component={AsyncLoctiteAdjustComponent}
      />
      <Route
        path={`${match.url}/:id`}
        component={AsyncSingleLoctiteComponent}
      />
    </Switch>
  </div>
);
export default LoctiteSwitcher;
