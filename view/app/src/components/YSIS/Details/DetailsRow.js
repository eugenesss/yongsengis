import React from "react";

const DetailsRow = ({ label, value }) => {
  return (
    <tr>
      <td className="w-30 py-10 text-left">
        <span
          style={{
            color: "#777",
            lineHeight: "20px",
            minHeight: "35px"
          }}
        >
          {label}
        </span>
      </td>
      <td className="text-left py-10">
        <span style={{ minHeight: "35px" }}>{value}</span>
      </td>
    </tr>
  );
};

export default DetailsRow;
