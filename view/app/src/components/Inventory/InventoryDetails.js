import React from "react";
import TabsHeader from "Components/YSIS/Tabs/TabsHeader";
import DetailsRow from "Components/YSIS/Details/DetailsRow";
import DetailsTable from "Components/YSIS/Details/DetailsTable";

const InventoryDetails = ({ item }) => {
  return (
    <React.Fragment>
      <div className="mb-30">
        <div className="row">
          <div className="col-6">
            <TabsHeader title="Inventory Details" />
            <DetailsTable>
              <DetailsRow label="Name" value={item.name} />
              <DetailsRow label="Category" value={item.cat_name} />
              <DetailsRow label="Material" value={item.material} />
              <DetailsRow label="Quantity" value={item.quantity} />
              <DetailsRow label="Qty Per Box" value={item.perbox} />
              <DetailsRow label="Unit Code" value={item.unit_code} />
            </DetailsTable>
          </div>
          <div className="col-6">
            <TabsHeader title="Location Details" />
            <DetailsTable>
              <DetailsRow label="Code" value={item.code} />
              <DetailsRow label="Location" value={item.location} />
              <DetailsRow label="Warehouse" value={item.wh_name} />
              <DetailsRow label="Rack" value={item.rack} />
            </DetailsTable>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h5>Description</h5>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InventoryDetails;
