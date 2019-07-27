import React from "react";
import {
  ViewCardLayout,
  ViewCardTitle,
  ViewCardDetails
} from "Components/YSIS/Layouts/ViewInventoryCard";

const InventoryCard = ({ name, category, stock, warehouse, rack }) => {
  return (
    <ViewCardLayout>
      <ViewCardTitle name={name} subHeading={[category]} />
    </ViewCardLayout>
  );
};

export default InventoryCard;
