import React from "react";

// form components
import { TextField } from "@material-ui/core";

export default function InventoryFilter(props) {
  const { handleChange, query } = props;
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex align-items-end mb-20">
          <div className="w-30">
            <TextField
              fullWidth
              label="Keyword"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              margin="dense"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
