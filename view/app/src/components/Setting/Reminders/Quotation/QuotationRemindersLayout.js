import React from "react";

import BgCard from "Components/Everyday/BgCard";
import QuotationReminderSettingsForm from "Components/Form/Setting/Reminders/Quotation/QuotationReminderSettingsForm";

import AccessControl from "Components/AccessControl";
import NoAccessComponent from "Components/AccessControl/NoAccessComponent";

const QuotationRemindersLayout = () => {
  return (
    <React.Fragment>
      <AccessControl action={["RemQuotationSet:update"]} noAccessComponent={<NoAccessComponent/>}>
        <BgCard heading={"Quotation Reminders Settings"}>
          <QuotationReminderSettingsForm/>
        </BgCard>
      </AccessControl>
    </React.Fragment>
  );
}

export default QuotationRemindersLayout;
