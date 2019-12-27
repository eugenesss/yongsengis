import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// async components
import * as async from "./AsyncRoutes";
import * as url from "Helpers/imsURL";

function imsSwitcher() {
  return (
    <div className="saas-dashboard">
      <Switch>
        {/* ------- /Inventory ------- */}
        <Route
          exact
          path={url.inventoryListPage}
          component={async.ims_inventory_list}
        />
        <Route
          exact
          path={url.inventoryNewPage}
          component={async.ims_inventory_new}
        />
        <Route
          exact
          path={url.inventoryMassUpdatePage}
          component={async.ims_inventory_massupdate}
        />

        {/* ------- /Loctite ------- */}
        <Route
          exact
          path={url.loctiteListPage}
          component={async.ims_loctite_list}
        />
        <Route
          exact
          path={url.loctiteNewPage}
          component={async.ims_loctite_new}
        />
        <Route
          exact
          path={url.loctiteMassUpdatePage}
          component={async.ims_loctite_massupdate}
        />
        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default imsSwitcher;
