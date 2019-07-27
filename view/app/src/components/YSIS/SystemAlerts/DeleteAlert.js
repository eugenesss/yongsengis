import React from "react";
import { connectModal } from "redux-modal";
import SweetAlert from "react-bootstrap-sweetalert";

const DeleteAlert = props => {
  function handleDelete() {
    props.action();
    props.handleHide();
  }
  const { show, handleHide, name } = props;
  return (
    <SweetAlert
      danger
      btnSize="sm"
      show={show}
      showCancel
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="primary"
      title="Are you sure?"
      onConfirm={() => handleDelete()}
      onCancel={() => handleHide()}
    >
      <p>
        Delete the record {`"${name}" ? `}You will not be able to recover this
        record!
      </p>
    </SweetAlert>
  );
};

export default connectModal({ name: "alert_delete" })(DeleteAlert);
