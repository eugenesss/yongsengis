import React from "react";
import TabsHeader from "Components/YSIS/Tabs/TabsHeader";
import DetailsRow from "Components/YSIS/Details/DetailsRow";
import DetailsTable from "Components/YSIS/Details/DetailsTable";

const LoctiteDetails = ({ item }) => {
  return (
    <React.Fragment>
      <div className="mb-30">
        <div className="row">
          <div className="col-7">
            <TabsHeader title="Loctite Details" />
            <DetailsTable>
              <DetailsRow label="Name" value={item.name} />
              <DetailsRow label="Category" value={item.cat_name} />
            </DetailsTable>
          </div>
          <div className="col-5">
            <TabsHeader title="Expiry Details" />
            <DetailsTable>
              <DetailsRow label="Batch No." value={item.code} />
              <DetailsRow label="Expiry Date" value={item.location} />
            </DetailsTable>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TabsHeader title="Description" />
            <div>{item.description}</div>
            {/* <DetailsTable>
              <DetailsRow label="Description" value={item.description} />
            </DetailsTable> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoctiteDetails;
