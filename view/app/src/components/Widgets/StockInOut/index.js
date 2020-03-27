import React from "react";
import BgCard from "Components/BgCard";
import LineChart from "Components/Charts/LineChart";
import RctSectionLoader from "Components/RctSectionLoader";
import RangeSelector from "./RangeSelector";

// api
import api from "Api";
import { NotificationManager } from "react-notifications";
import { monthly } from "./data";

export default function StockInOut() {
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    data: null,
    range: "Monthly",
    rangeField: ["Weekly", "Monthly", "Quarter", "Yearly"]
  });

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        // const result = await api.get('/')
        setState(prevState => ({ ...prevState, data: monthly }));
        setLoading(false);
      } catch (error) {
        NotificationManager.error("Error in getting stock report");
      }
    };
    getData();
  }, [state.range]);

  const onChangeRange = e => {
    setState(prevState => ({ ...prevState, range: e.target.value }));
  };

  return (
    <BgCard
      heading="Stock In Out"
      actionButtons={
        <RangeSelector
          onChange={onChangeRange}
          fields={state.rangeField}
          value={state.range}
        />
      }
    >
      {loading && <RctSectionLoader />}
      <LineChart
        data={state.data && state.data.data}
        labels={state.data && state.data.labels}
      />
    </BgCard>
  );
}
