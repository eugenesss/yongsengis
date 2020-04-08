import React from "react";
import BgCard from "Components/BgCard";
import List from "./List";

// Actions
import api from "Api";
import { NotificationManager } from "react-notifications";

export default function InvStockCount() {
  const [state, setState] = React.useState({ tableData: [], limit: 0 });
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {}, []);

  const getStockCount = async limit => {
    // const result = await api.get('/', limit)
    setLoading(!loading);
  };

  return (
    <BgCard heading="Low Stock Count">
      <List />
    </BgCard>
  );
}
