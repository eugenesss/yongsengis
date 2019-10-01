import React from "react";

import BgCard from "Components/Everyday/BgCard";
import QuotationSettingsForm from "Components/Form/Setting/Accounting/Quotation/QuotationSettingsForm";

import AccessControl from "Components/AccessControl";
import NoAccessComponent from "Components/AccessControl/NoAccessComponent"

const QuotationLayout = () => {
  return (
    <React.Fragment>
      <AccessControl action={["AccQuotationSet:update"]} noAccessComponent={<NoAccessComponent/>}>
        <BgCard heading={"Quotation Settings"}>
          <QuotationSettingsForm/>
        </BgCard>
      </AccessControl>
    </React.Fragment>
  );
}

export default QuotationLayout;
