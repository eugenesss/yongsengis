import React, { Component } from "react";
import { Helmet } from "react-helmet";

//Components
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// form
import LoctiteForm from "Components/Forms/Loctite/LoctiteForm";

class NewLoctite extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>YSIS | Add New Loctite</title>
          <meta name="description" content="YSIS Dashboard" />
        </Helmet>
        <RctCollapsibleCard heading="New Loctite">
          <div className="row">
            <div className="col-md-3">image upload</div>
            <div className="col-md-9">
              <LoctiteForm />
            </div>
          </div>
        </RctCollapsibleCard>
      </React.Fragment>
    );
  }
}

export default NewLoctite;
