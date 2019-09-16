import React from "react";

const DetailsRow = ({ label, value }) => {
  return (
    <tr>
      <td className="w-30 py-10 text-left">
        <h5>{label}</h5>
      </td>
      <td className="text-left py-10">
        <span style={{ minHeight: "35px" }}>{value}</span>
      </td>
    </tr>
  );
};

export default DetailsRow;
