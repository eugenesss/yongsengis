import React from "react";

import BgCard from "Components/Everyday/BgCard";
import InvoiceSettingsForm from "Components/Form/Setting/Accounting/Invoice/InvoiceSettingsForm";

import AccessControl from "Components/AccessControl";
import NoAccessComponent from "Components/AccessControl/NoAccessComponent"

const InvoiceLayout = () => {
  return (
    <React.Fragment>
      <AccessControl action={["AccInvoiceSet:update"]} noAccessComponent={<NoAccessComponent/>}>
        <BgCard heading={"Invoice Settings"}>
          <InvoiceSettingsForm/>
        </BgCard> 
      </AccessControl>
    </React.Fragment>
  );
}

export default InvoiceLayout;
