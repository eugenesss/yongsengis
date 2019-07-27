import React from "react";
import { Table } from "reactstrap";

const DetailsTable = ({ children }) => {
  return (
    <Table borderless className="border-0">
      <tbody>{children}</tbody>
    </Table>
  );
};

export default DetailsTable;
