import React from "react";

import DialogRoot from "Components/Dialog/DialogRoot";
import AddUserForm from "Components/Form/Setting/General/AddUserForm";

const AddUserDialog = ({ handleClose, show }) => {
  return (
    <DialogRoot show={show} handleHide={handleClose} size="md">
      <div className="p-20 pb-0">
        <AddUserForm />
      </div>
    </DialogRoot>
  );
};

export default AddUserDialog;
