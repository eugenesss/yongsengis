import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function InventoryInformation(props) {
  const {
    name,
    code,
    warehouse,
    rack,
    material,
    category,
    quantity,
    perbox,
    unit_code,
    description,
    picUpload,
    ...others
  } = props;
  return (
    <FormInputLayout title="Item Information" upload={picUpload} {...others}>
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {name}
          {code}
          {warehouse}
          {rack}
        </div>
        <div className="col-md-5 d-block offset-md-1">
          {material}
          {category}
          {quantity}
          {perbox}
          {unit_code}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-11 d-block">{description}</div>
      </div>
    </FormInputLayout>
  );
}

export { InventoryInformation };
