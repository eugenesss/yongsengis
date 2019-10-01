import React from "react";
import { connect } from "react-redux";

// Widgets
import Comments from "Components/Widgets/Comments";
import RelatedCustomer from "Components/CRM/Account/RelatedCustomer";

import { addNoteAccount } from "Actions";

function AccountOverviewTab(props) {
  const { acct } = props;
  function addNote(note) {
    props.addNoteAccount(acct.id, note);
  }
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6">
          <Comments comments={acct.notes} addComment={addNote} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <RelatedCustomer customers={acct.customers} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(
  null,
  { addNoteAccount }
)(AccountOverviewTab);
