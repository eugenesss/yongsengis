import React from "react";
import TableCell from "@material-ui/core/TableCell";

import FormTextField from "Components/Forms/Components/FormTextField";
import FormSelectField from "Components/Forms/Components/FormSelectField";
import FormNumberField from "./FormNumberField";

const FormBlock = ({
  label,
  value,
  handleChange,
  target,
  selectValues,
  customTextField,
  required,
  empty,
  numberInput,
  objProp,
  objLabel
}) => {
  return (
    <React.Fragment>
      <TableCell
        style={{ borderBottom: "none", width: "15%" }}
        padding="dense"
        align="right"
      >
        {label}
        {required && <sup style={{ color: "red" }}>*</sup>}
      </TableCell>
      <TableCell padding="dense" style={{ borderBottom: "none", width: "35%" }}>
        {!empty &&
          (customTextField ? (
            customTextField
          ) : selectValues ? (
            <FormSelectField
              value={value}
              handleChange={handleChange}
              target={target}
              selectValues={selectValues}
              objProp={objProp}
              objLabel={objLabel}
            />
          ) : numberInput ? (
            <FormNumberField
              value={value}
              handleChange={handleChange}
              target={target}
            />
          ) : (
            <FormTextField
              value={value}
              handleChange={handleChange}
              target={target}
            />
          ))}
      </TableCell>
    </React.Fragment>
  );
};

export default FormBlock;
