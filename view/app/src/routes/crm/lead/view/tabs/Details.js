import React from "react";
import BgCard from "Components/Everyday/BgCard";
import EditableInput from "Components/Everyday/Profile/Details/EditableInput";

import {
  KeyInformation,
  LeadInformation,
  CompanyInformation
} from "Components/Form/Lead//Layout";

const LeadDetailsTab = props => {
  const { lead } = props;
  return (
    <BgCard fullBlock>
      <KeyInformation
        fullWidth
        firstName={<EditableInput label="First Name" value={lead.baseContact.firstName} />}
        lastName={<EditableInput label="Last Name" value={lead.baseContact.lastName} />}
        owner={<EditableInput label="Owner" value={lead.userInfo.name} />}
        company={<EditableInput label="Company" value={lead.companyName} />}
        status={<EditableInput label="Status" value={lead.statusInfo.name} />}
      />
      <hr />
      <LeadInformation
        fullWidth
        email={<EditableInput label="Email" value={lead.baseContact.email} />}
        title={<EditableInput label="Job Title" value={lead.baseContact.title} />}
        interest={<EditableInput label="Lead Interest" value={lead.interest} />}
        mobile={<EditableInput label="Mobile" value={lead.baseContact.mobile} />}
        source={<EditableInput label="Source" value={lead.sourceInfo} />}
        description={<EditableInput multiline rows={4} label="Description" value={lead.baseContact.info} />}
      />
      <hr />
      <CompanyInformation
        fullWidth
        industry={<EditableInput label="Industry" value={lead.industryInfo && lead.industryInfo} />}
        website={<EditableInput label="Website" value={lead.baseContact.website} />}
        office={<EditableInput label="Office" value={lead.baseContact.phone} />}
        fax={<EditableInput label="Fax" value={lead.baseContact.fax} />}
        address={<EditableInput multiline rows={4} label="Address" value={lead.fullAddress} />}
      />
    </BgCard>
  );
};

export default LeadDetailsTab;
