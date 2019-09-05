import React from "react";
import TabsHeader from "Components/YSIS/Tabs/TabsHeader";
import DetailsRow from "Components/YSIS/Details/DetailsRow";
import DetailsTable from "Components/YSIS/Details/DetailsTable";

import { getTheDate } from "Helpers/helpers";

const LoctiteDetails = ({ item }) => {
  return (
    <React.Fragment>
      <div className="mb-30">
        <div className="row">
          <div className="col-7">
            <TabsHeader title="Loctite Details" />
            <DetailsTable>
              <DetailsRow label="Name" value={item.name} />
              <DetailsRow label="Quantity" value={item.quantity} />
            </DetailsTable>
          </div>
          <div className="col-5">
            <TabsHeader title="Expiry Details" />
            <DetailsTable>
              <DetailsRow label="Batch No." value={item.batch} />
              <DetailsRow
                label="Expiry Date"
                value={getTheDate(item.expiry_date)}
              />
            </DetailsTable>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TabsHeader title="Description" />
            <div>{item.description}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoctiteDetails;
