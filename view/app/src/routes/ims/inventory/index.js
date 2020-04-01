import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "redux-modal";

//Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import ListViewSelector from "Components/PageTitleBar/ListViewSelector";

import InventoryList from "./components/InventoryList";

// View Dialog
import ShowInventory from "./view";
import EditInventory from "./edit";

import {
  inventoryNewPage,
  inventoryMassUpdatePage,
  inventoryImportPage
} from "Helpers/imsURL";
// Actions
import { getAllInventory, deleteInventory } from "Ducks/ims/inventory";
// get warehouse
import { getWarehouse } from "Ducks/ims/fields";

export default function ims_inventory_list(props) {
  const dispatch = useDispatch();
  const { history } = props;
  const {
    inventoryState: {
      inventoryList: { tableData, loading }
    },
    imsField: { warehouse }
  } = useSelector(state => state.imsState);

  const [nowShowing, setNowShowing] = React.useState("");

  React.useEffect(() => {
    dispatch(getAllInventory(nowShowing));
  }, [nowShowing]);

  React.useEffect(() => {
    dispatch(getWarehouse());
  }, []);

  const changeShowing = event => {
    setNowShowing(event.target.value);
  };

  // Item CRUD
  const deleteItem = (id, name) => {
    dispatch(
      show("alert_delete", {
        name: name,
        action: () => dispatch(deleteInventory(id))
      })
    );
  };
  const viewItem = itemID => {
    dispatch(show("view_inventory", { itemID }));
  };
  const editItem = itemToEdit => {
    dispatch(show("edit_inventory", { itemToEdit }));
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>YSIS | Inventory</title>
        <meta name="description" content="YSIS Inventory List" />
      </Helmet>
      <PageTitleBar
        title="All Inventory"
        actionGroup={{
          add: { onClick: () => history.push(inventoryNewPage) },
          mid: {
            label: "Mass Update",
            onClick: () => history.push(inventoryMassUpdatePage)
          },
          more: [
            {
              label: "Import Inventory",
              onClick: () => history.push(inventoryImportPage)
            }
          ]
        }}
      />

      <BgCard>
        {loading && <RctSectionLoader />}
        <InventoryList
          title={
            <ListViewSelector
              options={[{ wh_name: "All Inventory", wid: "" }, ...warehouse]}
              nowShowing={nowShowing}
              onChangeValue={changeShowing}
              optValue="wid"
              optLabel="wh_name"
            ></ListViewSelector>
          }
          tableData={tableData}
          handleView={viewItem}
        />
      </BgCard>
      <ShowInventory handleEdit={editItem} handleDelete={deleteItem} />
      <EditInventory />
    </React.Fragment>
  );
}
