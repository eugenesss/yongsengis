import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// async components
import * as async from "Components/AsyncComponent/Settings";
import SettingsDirectory from "Components/Setting/SettingsDirectory";

class Settings extends Component {
  render() {
    const { match, location } = this.props;
    if (location.pathname === "/app/settings") {
      return <Redirect to={"/app/settings/general/my-profile"} />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | System Settings</title>
          <meta name="description" content="Everyday System" />
        </Helmet>
        <PageTitleBar title="Settings" />
        <div className="row">
          <div className="col-lg-2">
            <SettingsDirectory />
          </div>
          <div className="col-lg-10">
            <Switch>
              {/* ------- General ------- */}
              <Route
                exact
                path={`${match.url}/general/my-profile`}
                component={async.gen_myProfile}
              />
              <Route
                exact
                path={`${match.url}/general/company-details`}
                component={async.gen_companyDetails}
              />
              {/* ------- Users and Controls ------- */}

              <Route
                exact
                path={`${match.url}/users-and-controls/users`}
                component={async.user_usersList}
              />
              <Route
                exact
                path={`${match.url}/users-and-controls/roles-and-permissions`}
                component={async.user_rolesPermissions}
              />
              <Route
                exact
                path={`${match.url}/users-and-controls/groups`}
                component={async.user_groups}
              />
              {/* ------- CRM ------- */}
              <Route
                exact
                path={`${match.url}/crm/team`}
                component={async.crm_team}
              />

              {/* ------- Accounting ------- */}
              <Route
                exact
                path={`${match.url}/accounting/credit-note`}
                component={async.acc_creditNote}
              />
              <Route
                exact
                path={`${match.url}/accounting/general`}
                component={async.acc_general}
              />
              <Route
                exact
                path={`${match.url}/accounting/invoice`}
                component={async.acc_invoice}
              />
              <Route
                exact
                path={`${match.url}/accounting/quotation`}
                component={async.acc_quotation}
              />

              {/* ------- Reminders ------- */}
              <Route
                exact
                path={`${match.url}/reminders/lead-reminders`}
                component={async.cron_leadReminders}
              />
              <Route
                exact
                path={`${match.url}/reminders/quotation-reminders`}
                component={async.cron_quotationReminders}
              />
              {/* ------- /404 ------- */}
              <Redirect to="/404" />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Settings);
