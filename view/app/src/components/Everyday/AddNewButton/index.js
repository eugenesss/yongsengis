import React from "react";
import MatButton from "@material-ui/core/Button";

const AddNewButton = ({ handleOnClick, label }) => {
  return (
    <MatButton onClick={handleOnClick} className="text-primary mb-10">
      {label}
    </MatButton>
  );
};

export default AddNewButton;
