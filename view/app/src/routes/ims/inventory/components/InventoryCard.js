import React from "react";
import {
  ViewCardLayout,
  ViewCardTitle,
  ViewCardDetails
} from "Components/Layouts/ViewInventoryCard";

const InventoryCard = ({ name, category, image, stock, warehouse, rack }) => {
  return (
    <ViewCardLayout>
      <ViewCardTitle name={name} image={image} subHeading={[category]} />
    </ViewCardLayout>
  );
};

export default InventoryCard;
