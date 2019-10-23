import React from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

// Page Components
import LoctiteForm from "../components/forms/LoctiteForm";

// Actions
import { submitLoctite } from "Ducks/ims/loctite";

const ims_loctite_new = props => (
  <React.Fragment>
    <Helmet>
      <title>YSIS | New Loctite</title>
    </Helmet>
    <LoctiteForm
      title="sidebar.newLoctite"
      handleSubmit={props.submitLoctite}
    />
  </React.Fragment>
);

export default connect(
  null,
  { submitLoctite }
)(ims_loctite_new);
