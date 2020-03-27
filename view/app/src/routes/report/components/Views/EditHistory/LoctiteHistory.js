import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
// Charts
import EditHistoryChart from "Components/Charts/EditHistoryChart";
// Actions
import { getEditHistoryLoc } from "Ducks/report";

class LoctiteHistoryReport extends Component {
  componentDidMount() {
    this.props.getEditHistoryLoc();
  }
  render() {
    const { loading, data } = this.props.loctite;
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
  const { loctite } = reportState.editHistory;
  return { loctite };
};

export default connect(mapStateToProps, { getEditHistoryLoc })(
  LoctiteHistoryReport
);
