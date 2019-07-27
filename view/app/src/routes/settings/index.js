import React, { Component } from "react";
// page req
import { Helmet } from "react-helmet";
//Page Req
import SettingsDrawer from "Components/Settings/SettingsDrawer";
import SettingsView from "Components/Settings/SettingsView";

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: "",
      nestedView: { user: false, general: false }
    };
    this.handleNestedView = this.handleNestedView.bind(this);
    this.onSelectView = this.onSelectView.bind(this);
  }

  handleNestedView(view) {
    this.setState({
      ...this.state,
      nestedView: {
        ...this.state.nestedView,
        [view]: !this.state.nestedView[view]
      }
    });
  }

  onSelectView(view) {
    this.setState({
      ...this.state,
      activeView: view
    });
  }
  render() {
    const { nestedView, activeView } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Settings</title>
        </Helmet>
        <div className="row">
          <div className="col-2" style={{ height: "calc(100vh - 160px)" }}>
            <SettingsDrawer
              activeView={activeView}
              nestedView={nestedView}
              openNestedView={this.handleNestedView}
              changeReportView={this.onSelectView}
            />
          </div>
          <div className="col-10">
            <SettingsView componentToRender={activeView} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SettingsPage;
