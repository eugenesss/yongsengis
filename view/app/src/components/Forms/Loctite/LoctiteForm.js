import React, { Component } from "react";

// Form Compnnets
import FormTable from "Components/Forms/Components/FormTable";
import FormBlock from "Components/Forms/Components/FormBlock";
import TableRow from "@material-ui/core/TableRow";

import DescriptionFormInput from "Components/Forms/Components/DescriptionFormInput";

class InventoryForm extends Component {
  state = {};
  render() {
    return (
      <FormTable>
        <TableRow>
          <FormBlock label="Name" />
          <FormBlock label="Batch" />
        </TableRow>
        <TableRow>
          <FormBlock label="Total Stock" />
          <FormBlock label="Expiration Date" />
        </TableRow>
        <DescriptionFormInput />
      </FormTable>
    );
  }
}

export default InventoryForm;
