import React, { Component } from "react";
import { connect } from "react-redux";
// import ReportContainer from "../../ReportContainer";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import EditHistoryChart from "Components/Charts/EditHistoryChart";
// Actions
import { getEditHistoryInv } from "Ducks/report";

class InventoryHistoryReport extends Component {
  componentDidMount() {
    this.props.getEditHistoryInv();
  }
  render() {
    const { loading, data } = this.props.inventory;
    return (
      <React.Fragment>
        {loading && <RctSectionLoader />}
        {data ? (
          <EditHistoryChart data={data} />
        ) : (
          <p className="text-muted text-center">
            <i>No Records</i>
          </p>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ reportState }) => {
  const { inventory } = reportState.editHistory;
  return { inventory };
};

export default connect(
  mapStateToProps,
  { getEditHistoryInv }
)(InventoryHistoryReport);
