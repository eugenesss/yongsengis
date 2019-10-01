import React from "react";
import FormInputLayout from "Components/Form/Components/Layout/FormInputLayout";

function LeadInformation(props) {
  const {
    email,
    title,
    interest,
    mobile,
    source,
    description,
    ...others
  } = props;
  return (
    <FormInputLayout
      title="Lead Information"
      desc="This information is used to contact leads and will be transferred to Customer on successful conversion."
      {...others}
    >
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {email}
          {title}
          {interest}
        </div>
        <div className="col-md-5 d-block offset-md-1">
          {mobile}
          {source}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-11 d-block">{description}</div>
      </div>
    </FormInputLayout>
  );
}

export { LeadInformation };
