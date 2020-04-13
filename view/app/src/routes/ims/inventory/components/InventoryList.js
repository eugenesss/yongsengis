import React, { Component } from "react";
import { connect } from "react-redux";
import AccessComponent from "Auth/AccessComponent";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import QtyAdjust from "./QtyAdjust";
import ListViewSelector from "Components/PageTitleBar/ListViewSelector";

// Actions
import { getAllInventory } from "Ducks/ims/inventory";
import { getWarehouse, getCategories } from "Ducks/ims/fields";
import { ControlPointDuplicate } from "@material-ui/icons";

function getFilters(filterList, columns) {
  let filter = [];
  for (let i = 0; i < filterList.length; i++) {
    let list = filterList[i];
    if (list.length > 0) {
      let property = columns[i].name;
      for (let a = 0; a < list.length; a++) {
        let value = list[a];
        filter.push({ [property]: value });
      }
    }
  }
  return filter;
}

class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 0,
      skip: 0,
      filters: [],
      searchText: "",
      orderBy: [],
      serverSideFilterList: [],
      columns: [],
      sorted: {
        name: "",
        direction: "",
      },
      nowShowing: "all",
      catShowing: "all",
    };
    this.triggerSearch = this.triggerSearch.bind(this);
  }

  componentDidMount() {
    this.props.getWarehouse();
    this.props.getCategories();
  }

  changeNowShowing = (event) => {
    this.setState({ nowShowing: event.target.value });
    this.props.getAllInventory(
      event.target.value,
      this.state.catShowing,
      this.state.limit,
      this.state.skip,
      this.state.searchText
    );
  };
  changeCatShowing = (event) => {
    this.setState({ catShowing: event.target.value });
    this.props.getAllInventory(
      this.state.nowShowing,
      event.target.value,
      this.state.limit,
      this.state.skip,
      this.state.searchText
    );
  };

  // handleFilterSubmit(filterList) {
  //   const filter = getFilters(filterList, this.state.columns);
  //   this.props.getAllCustomer(this.state.limit, this.state.skip, filter);
  //   this.setState({ filters: filterList, serverSideFilterList: filterList });
  // }

  triggerSearch(searchText) {
    this.setState({ searchText: searchText, skip: 0 });
    clearInterval(this.searchInterval);
    this.props.getAllInventory(
      this.state.nowShowing,
      this.state.catShowing,
      this.state.limit,
      this.state.skip,
      this.state.searchText
    );
  }

  render() {
    const { nowShowing, catShowing } = this.state;
    const {
      tableData,
      totalCount,
      warehouse,
      categories,
      handleView,
    } = this.props;

    const options = Object.assign({}, listOptions, {
      setTableProps: () => ({ size: "small" }),

      //server side options
      serverSide: true,
      count: totalCount,
      onTableInit: (action, tableState) => {
        const limit = tableState.rowsPerPage;
        const skip = tableState.page * tableState.rowsPerPage;
        if (action == "tableInitialized") {
          this.setState({
            limit,
            skip,
            filters: tableState.filterList,
            columns: tableState.columns,
          });
          // Component did mount
          this.props.getAllInventory(
            nowShowing,
            catShowing,
            limit,
            skip,
            this.state.searchText
          );
        }
      },
      onTableChange: (action, tableState) => {
        const limit = tableState.rowsPerPage;
        const skip = tableState.page * tableState.rowsPerPage;
        switch (action) {
          case "propsUpdate":
            tableState.filterList = this.state.filters;
            break;
          case "changePage":
          case "changeRowsPerPage":
            this.setState({ limit, skip });
            this.props.getAllInventory(
              nowShowing,
              catShowing,
              limit,
              skip,
              this.state.searchText
            );
            break;
        }
      },

      // onFilterChange: (column, filterList, type) => {
      //   if (type == "chip") {
      //     var filter = getFilters(filterList, this.state.columns);
      //     this.props.getAllCustomer(
      //       this.state.limit,
      //       this.state.skip,
      //       filter,
      //       this.state.searchText,
      //       this.state.orderBy
      //     );
      //   }
      // },

      search: true,
      searchText: this.state.searchText,
      onSearchChange: (searchText) => {
        if (searchText == null) {
          this.setState({ searchText: "" });
          this.triggerSearch("");
        } else if (searchText.length > 1) {
          clearInterval(this.searchInterval);
          this.searchInterval = setInterval(
            this.triggerSearch,
            1000,
            searchText
          );
        }
      },
      onSearchClose: () => {
        this.setState({ searchText: "" });
        this.triggerSearch("");
      },

      // onColumnSortChange: (column, direction) => {
      //   var orderString = column;
      //   var sorted = { name: column };
      //   if (direction == "descending") {
      //     orderString += " DESC";
      //     sorted.direction = "desc";
      //   } else {
      //     orderString += " ASC";
      //     sorted.direction = "asc";
      //   }
      //   this.setState({
      //     orderBy: [orderString],
      //     sorted: sorted
      //   });
      //   this.props.getAllCustomer(
      //     this.state.limit,
      //     this.state.skip,
      //     this.state.filter,
      //     this.state.searchText,
      //     [orderString]
      //   );
      // },

      // sort: true,
      // filterType: "dropdown",
      // serverSideFilterList: this.state.serverSideFilterList,
      // customFilterDialogFooter: filterList => {
      //   return (
      //     <div style={{ marginTop: "40px" }}>
      //       <Button
      //         className="btn-success text-white"
      //         variant="contained"
      //         onClick={() => this.handleFilterSubmit(filterList)}
      //       >
      //         Search
      //       </Button>
      //     </div>
      //   );
      // },
      //  customToolbarSelect: (selectedRows, displayData, setSelectRows) =>
      //   null
    });

    const columns = [
      {
        label: "ID",
        name: "pid",
        options: { display: "excluded", filter: false, sort: false },
      },
      {
        label: "Name",
        name: "name",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <a
                className="text-primary"
                onClick={() => handleView(tableMeta.rowData[0])}
              >
                {value}
              </a>
            );
          },
        },
      },
      { label: "Code", name: "code", options: { filter: false } },
      {
        label: "Material",
        name: "material",
      },
      {
        label: "categories",
        name: "cat_name",
        options: { filter: false, sort: false },
      },
      {
        label: "Unit Code",
        name: "unit_code",
        options: { filter: false },
      },
      {
        label: "Quantity Per Box",
        name: "perbox",
        options: { display: false, filter: false },
      },
      {
        label: "Rack",
        name: "rack",
        options: { filter: false },
      },
      {
        label: "Warehouse",
        name: "wh_name",
        options: { filter: false, sort: false },
      },
      {
        label: "Quantity",
        name: "quantity",
        options: {
          filter: false,
        },
      },
      {
        label: "Adjust Qty",
        name: "pid",
        options: {
          sort: false,
          filter: false,
          search: false,
          customBodyRender: (value, tableMeta) => (
            <AccessComponent>
              <QtyAdjust pid={value} name={tableMeta.rowData[1]} />
            </AccessComponent>
          ),
        },
      },
    ];

    const { optionProps, tableProps } = this.props;
    return (
      <RecordsList
        title={
          <React.Fragment>
            <ListViewSelector
              options={[{ wh_name: "All Inventory", wid: "all" }, ...warehouse]}
              nowShowing={nowShowing}
              onChangeValue={this.changeNowShowing}
              optValue="wid"
              optLabel="wh_name"
              className="mr-30"
            ></ListViewSelector>
            <ListViewSelector
              options={[
                { cat_name: "All Categories", cid: "all" },
                ...categories,
              ]}
              nowShowing={catShowing}
              onChangeValue={this.changeCatShowing}
              optValue="cid"
              optLabel="cat_name"
            ></ListViewSelector>
          </React.Fragment>
        }
        columns={columns}
        data={tableData}
        options={{ ...options, ...optionProps }}
        {...tableProps}
      />
    );
  }
}
const mapStateToProps = ({ imsState }) => {
  const {
    inventoryState: {
      inventoryList: { tableData, totalCount },
    },
    imsField: { warehouse, categories },
  } = imsState;
  return { tableData, totalCount, warehouse, categories };
};
export default connect(
  mapStateToProps,
  { getAllInventory, getWarehouse, getCategories }
)(InventoryList);
