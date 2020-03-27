import React from "react";
import { Line } from "react-chartjs-2";
import { PastelOne9 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

export default function LineChart(props) {
  const { data, labels } = props;

  const datasets =
    data &&
    data.map((dat, key) => ({
      label: dat.label,
      data: dat.data,
      fill: false,
      backgroundColor: PastelOne9[key],
      borderColor: PastelOne9[key]
    }));

  return <Line data={{ labels, datasets }} />;
}
