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
        {/* <Route path={url.customerNewPage} component={async.crm_new_customer} />
        <Route
          path={url.customerImportPage}
          component={async.crm_import_customer}
        />
        <Route
          exact
          path={`${url.customerListPage}/:id`}
          component={async.crm_single_customer}
        />
        <Route
          path={`${url.customerListPage}/:id/edit`}
          component={async.crm_edit_customer}
        /> */}

        {/* ------- /404 ------- */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default imsSwitcher;
