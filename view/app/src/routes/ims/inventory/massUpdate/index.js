import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// Sub Components
import InventoryFilter from "./InventoryFilter";
import InventoryFilteredTable from "./InventoryFilteredTable";
import AdjustmentTable from "./AdjustmentTable";

import { massUpdateInventory } from "Ducks/ims/inventory";
import api from "Api";

export default function ims_inventory_massupdate() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [queriedData, setQueriedData] = useState([]);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getQueriedData() {
      const result = await api.get(
        `/show_items?wid=all&cid=all&query=${query}`
      );
      setCount(result.data.count);
      setQueriedData(result.data.results[0]);
    }
    const timer = setTimeout(() => {
      query != "" && getQueriedData();
    }, 1000);
    return () => clearTimeout(timer);
  }, [query]);

  function selectFromFilter(val) {
    const selectedItem = Object.assign([], selected);
    const inventorySelected = queriedData.find((inv) => inv.pid == val);
    selectedItem.push(inventorySelected);
    setSelected(selectedItem);

    const objFilter = Object.assign([], queriedData);
    const queriedDataFiltered = objFilter.filter((el) => {
      return selectedItem.some((f) => {
        return f.pid !== el.pid;
      });
    });
    setQueriedData(queriedDataFiltered);
  }

  function removeFromAdjustment(val) {
    const inventorySelected = selected.find((inv) => inv.pid == val);
    const newSelected = Object.assign([], selected).filter(
      (inv) => inv.pid != val
    );
    setSelected(newSelected);

    const newQueried = Object.assign([], queriedData);
    newQueried.push(inventorySelected);
    setQueriedData(newQueried);
  }

  function onAdjust(field, val, key) {
    const newSelectedState = Object.assign([], selected);
    const item = newSelectedState[key];
    item[field] = val;
    setSelected(newSelectedState);
  }

  return (
    <React.Fragment>
      <div className="mb-50">
        <Helmet>
          <title>YSIS | Mass Update Inventory</title>
        </Helmet>
        <PageTitleBar title="Mass Update Inventory" />
        <InventoryFilter handleChange={setQuery} query={query} />
        <InventoryFilteredTable
          data={queriedData}
          handleSelect={selectFromFilter}
        />
        <hr />
        <AdjustmentTable
          update={() => dispatch(massUpdateInventory(selected))}
          onAdjust={onAdjust}
          remove={removeFromAdjustment}
          tableData={selected}
        />
      </div>
    </React.Fragment>
  );
}
