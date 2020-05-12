import React, { Component } from "react";
import { connect } from "react-redux";

// Global Req
import { Helmet } from "react-helmet";
// Components
import ImportRecords from "Components/ImportRecords";
import RctSectionLoader from "Components/RctSectionLoader";

// Actions
import { importRecord } from "Ducks/import";

class ims_inventory_import extends Component {
  constructor(props) {
    super(props);
    this.importInventoryRecord = this.importInventoryRecord.bind(this);
  }

  importInventoryRecord(file) {
    this.props.importRecord("inventory", file);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Import Inventory</title>
        </Helmet>
        {this.props.loading && <RctSectionLoader />}
        <ImportRecords
          importType="inventory"
          importAction={this.importInventoryRecord}
          // importFile="/inventory.csv"
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ importState }) => {
  const { loading } = importState;
  return { loading };
};

export default connect(
  mapStateToProps,
  { importRecord }
)(ims_inventory_import);
