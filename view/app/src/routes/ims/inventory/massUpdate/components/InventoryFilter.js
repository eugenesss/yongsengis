import React, { Component } from "react";
import { connect } from "react-redux";

// sub components
import RctSectionLoader from "Components/RctSectionLoader";
import InventoryFilteredTable from "./InventoryFilteredTable";

// form components
import { TextField, MenuItem, Button } from "@material-ui/core";

// Actions
import { filterInventory, clearFilterInventory } from "Ducks/ims/inventory";

const init_state = {
  field: "",
  keyword: "",
  fieldOptions: ["name", "code"]
};

class InventoryFilter extends Component {
  constructor(props) {
    super(props);
    this.state = init_state;
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(type, val) {
    this.setState({ [type]: val });
  }
  handleClear() {
    this.props.clearFilterInventory();
    this.setState(init_state);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.filterInventory(this.state.field, this.state.keyword);
  }

  render() {
    const { populatedData, loading } = this.props.massUpdate;
    const { field, keyword, fieldOptions } = this.state;
    return (
      <div className="row">
        {loading && <RctSectionLoader />}
        <div className="col-md-12">
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex align-items-end mb-20">
              <div className="w-10">
                <TextField
                  select
                  fullWidth
                  label="Field"
                  value={field}
                  onChange={e => this.handleChange("field", e.target.value)}
                  margin="dense"
                >
                  {fieldOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <p className="px-20 mb-1">contains</p>
              <div className="w-30">
                <TextField
                  fullWidth
                  label="Keyword"
                  value={keyword}
                  onChange={e => this.handleChange("keyword", e.target.value)}
                  margin="dense"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  onClick={this.handleSubmit}
                  color="secondary"
                  variant="outlined"
                  className="mx-20"
                >
                  Search
                </Button>
                <Button onClick={this.handleClear}>Clear</Button>
              </div>
            </div>
          </form>
          <InventoryFilteredTable
            data={populatedData}
            handleSelect={this.props.handleSelect}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ imsState }) => {
  const { inventoryState } = imsState;
  const { massUpdate } = inventoryState;
  return { massUpdate };
};

export default connect(
  mapStateToProps,
  {
    filterInventory,
    clearFilterInventory
  }
)(InventoryFilter);
