import React, { Component } from "react";
import { connect } from "react-redux";

import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { HomeWork, Business } from "@material-ui/icons";

import { getWarehouseHealth } from "Ducks/widget/WarehouseHealth";

// component
import TabsWrapper from "Components/Tabs/TabsWrapper";
import RctSectionLoader from "Components/RctSectionLoader";

//chart component
import DoughnutChart from "Components/Charts/DoughnutChart";

class WarehouseHealth extends Component {
  componentDidMount() {
    this.props.getWarehouseHealth();
  }

  renderOverviewChart(low, mid, high) {
    const labels = ["Low Count", "Mid Count", "High Count"];
    const data = [low, mid, high];
    return <DoughnutChart height={100} labels={labels} data={data} />;
  }

  render() {
    const { data, loading } = this.props;
    return (
      <React.Fragment>
        {loading && <RctSectionLoader />}
        <TabsWrapper>
          {data.length > 0 &&
            data.map((wh, key) => (
              <div key={key} icon={<HomeWork size="small" />} label={wh.name}>
                <div className="support-widget-wrap">
                  <div className="text-center py-10">
                    {this.renderOverviewChart(wh.low, wh.mid, wh.high)}
                  </div>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Total Inventory</TableCell>
                        <TableCell align="center">
                          {wh.totalInventory}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Low Count</TableCell>
                        <TableCell align="center">{wh.low}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Mid Count</TableCell>
                        <TableCell align="center">{wh.mid}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total High Count</TableCell>
                        <TableCell align="center">{wh.high}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
        </TabsWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ widgetState }) => {
  const { warehouseHealth } = widgetState;
  const { data, loading } = warehouseHealth;
  return { data, loading };
};

export default connect(mapStateToProps, { getWarehouseHealth })(
  WarehouseHealth
);
