import React, { Component } from "react";
import { connect } from "react-redux";

// Global Req
import { Helmet } from "react-helmet";
// Components
import ImportRecords from "Components/ImportRecords";
import RctSectionLoader from "Components/RctSectionLoader";

// Actions
import { importRecord } from "Ducks/import";

class ims_loctite_import extends Component {
  constructor(props) {
    super(props);
    this.importLoctiteRecord = this.importLoctiteRecord.bind(this);
  }

  importLoctiteRecord(file) {
    this.props.importRecord("loctite", file);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Import Loctite</title>
        </Helmet>
        {this.props.loading && <RctSectionLoader />}
        <ImportRecords
          importType="loctite"
          importAction={this.importLoctiteRecord}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ importState }) => {
  const { loading } = importState;
  return { loading };
};

export default connect(mapStateToProps, { importRecord })(ims_loctite_import);
