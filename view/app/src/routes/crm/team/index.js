import React, { Component } from "react";

//Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// Components
import TeamBlock from "Components/CRM/Team/TeamBlock";
import EditTeamModal from "./edit/EditTeamModal";

class crm_team_view extends Component {
  constructor(props) {
    super(props);
    this.state = { editModal: false };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.setState({ editModal: !this.state.editModal });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Sales Team</title>
          <meta name="description" content="Everyday Sales Team Management" />
        </Helmet>
        <PageTitleBar title="View Teams" createLink="/crm/new/lead" />
        <div className="row">
          <TeamBlock edit={this.handleEdit} />
          <TeamBlock />
          <TeamBlock />
          <TeamBlock />
          <TeamBlock />
        </div>
        <EditTeamModal
          show={this.state.editModal}
          handleHide={this.handleEdit}
        />
      </React.Fragment>
    );
  }
}

export default crm_team_view;
