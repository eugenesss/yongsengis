import React from "react";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

function LoctiteInformation(props) {
  const {
    name,
    quantity,
    description,
    batch,
    price,
    expiry_date,
    file,
    ...others
  } = props;
  return (
    <FormInputLayout title="Loctite Information" {...others}>
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {name}
          {price}
        </div>
        <div className="col-md-5 d-block offset-md-1">
          {quantity}
          {batch}
          {expiry_date}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-11 d-block">{description}</div>
      </div>
    </FormInputLayout>
  );
}

export { LoctiteInformation };
