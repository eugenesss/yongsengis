import React from "react";
import { Route, Switch } from "react-router-dom";

// async components
import {
  AsyncWarehouse1Component,
  AsyncWarehouse2Component,
  AsyncWarehouse3Component
} from "Components/AsyncComponent/AsyncComponent";

const WarehouseSwitcher = ({ match }) => (
  <div className="saas-dashboard">
    <Switch>
      <Route
        path={`${match.url}/warehouse_1`}
        component={AsyncWarehouse1Component}
      />
      <Route
        exact
        path={`${match.url}/warehouse_2`}
        component={AsyncWarehouse2Component}
      />
      <Route
        exact
        path={`${match.url}/warehouse_3`}
        component={AsyncWarehouse3Component}
      />
    </Switch>
  </div>
);
export default WarehouseSwitcher;
