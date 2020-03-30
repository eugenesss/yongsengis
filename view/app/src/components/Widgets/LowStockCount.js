import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BgCard from "Components/BgCard";

// Actions
import { getAllInventory } from "Ducks/ims/inventory";

export default function LowStockCount() {
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(getAllInventory());
  // }, []);
  // const invState = useSelector(
  //   state => state.imsState.inventoryState.inventoryList
  // );

  console.log(invState);
  return (
    <BgCard heading="Low Stock Count">
      <p>LowStockCount</p>
    </BgCard>
  );
}
