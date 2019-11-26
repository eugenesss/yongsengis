import React from "react";
import { connectModal } from "redux-modal";

import DialogRoot from "Components/Dialog/DialogRoot";
import AddUserForm from "../forms/AddUserForm";

const AddUserDialog = ({ handleHide, show, edit }) => {
  return (
    <DialogRoot show={show} handleHide={handleHide} size="md">
      <div className="p-20 pb-0">
        <AddUserForm edit={edit} />
      </div>
    </DialogRoot>
  );
};

export default connectModal({ name: "add_user" })(AddUserDialog);
