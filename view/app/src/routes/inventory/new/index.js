import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

//Components
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// form
import InventoryForm from "Components/Forms/Inventory/InventoryForm";

// action
import { submitInventory } from "Actions";

class NewInventory extends Component {
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
          <title>YSIS | Add New Item</title>
          <meta name="description" content="YSIS Dashboard" />
        </Helmet>
        <RctCollapsibleCard heading="New Item">
          <div className="row">
            <div className="col-md-3">image upload</div>
            <div className="col-md-9">
              <InventoryForm
                handleSubmit={this.props.submitInventory}
                handleCancel={this.handleBack}
                // handleSaveNew
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
  { submitInventory }
)(NewInventory);
