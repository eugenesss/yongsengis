import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

//Components
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// form
import LoctiteForm from "Components/Forms/Loctite/LoctiteForm";

// actions
import { submitLoctite } from "Actions";

class NewLoctite extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }
  handleBack() {
    this.props.history.goBack();
  }

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
              <LoctiteForm
                handleSubmit={this.props.submitLoctite}
                handleCancel={this.handleBack}
              />
            </div>
          </div>
        </RctCollapsibleCard>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { submitLoctite }
)(NewLoctite);
