import React from "react";
import { connectModal } from "redux-modal";

import DialogRoot from "Components/Dialog/DialogRoot";

function NewTodo(props) {
  const { show, handleHide } = props;
  return (
    <DialogRoot title="New To Do" show={show} handleHide={handleHide} size="sm">
      new to do
    </DialogRoot>
  );
}

export default connectModal({ name: "new_todo" })(NewTodo);
