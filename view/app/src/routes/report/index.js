import React, { Component } from "react";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

//Page Req
import ReportViews from "./components/Views";

// Side Drawer
import SideDrawer from "Components/Everyday/SideDrawer";
import DrawerListCollapsible from "Components/Everyday/SideDrawer/DrawerListCollapsible";
import DrawerListItem from "Components/Everyday/SideDrawer/DrawerListItem";

class ReportsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: "",
      nestedView: {
        editHistory: true,
        sales: false,
        leads: false,
        deals: false,
        acctcust: false,
        closedDeals: false
      },
      dateRange: { startDate: null, endDate: null, focusedInput: null }
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
      <div className="todo-dashboard">
        <Helmet>
          <title>YSIS | Reports</title>
        </Helmet>
        <PageTitleBar title="Reports" />
        <div className="row">
          <div className="col-lg-2">
            <SideDrawer listHeader="Reports List">
              <DrawerListCollapsible
                title="Edit History"
                state={nestedView.editHistory}
                openNested={() => this.handleNestedView("editHistory")}
              >
                <DrawerListItem
                  onClickListItem={() => this.onSelectView("editHistoryInv")}
                  title="Inventory"
                  secondary
                  selected={activeView == "editHistoryInv"}
                />
                <DrawerListItem
                  onClickListItem={() =>
                    this.onSelectView("editHistoryLoctite")
                  }
                  title="Loctite"
                  secondary
                  selected={activeView == "editHistoryLoctite"}
                />
              </DrawerListCollapsible>
            </SideDrawer>
          </div>
          <div className="col-lg-10">
            <ReportViews componentToRender={activeView} />
          </div>
        </div>
      </div>
    );
  }
}

export default ReportsComponent;
