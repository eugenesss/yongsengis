import React from "react";
import DialogRoot from "Components/Dialog/DialogRoot";

import { getTheDate } from "Helpers/helpers";

export default function ViewTodo(props) {
  const { view, show, handleHide } = props;
  return (
    <DialogRoot
      size="md"
      title={view.title}
      show={show}
      handleHide={handleHide}
    >
      <p>{view.description}</p>
      <hr />
      <small>{getTheDate(view.created_at)}</small>
    </DialogRoot>
  );
}
