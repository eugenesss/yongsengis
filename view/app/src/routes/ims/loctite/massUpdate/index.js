import React, { Component } from "react";
import { connect } from "react-redux";
// Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// Sub Components
import RctSectionLoader from "Components/RctSectionLoader";
import LoctiteFilter from "./components/LoctiteFilter";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button
} from "@material-ui/core";
import LoctiteAdjustmentRow from "./components/LoctiteAdjustmentRow";
// Actions
import {
  getAllLoctite,
  removeFromLocList,
  massUpdateLoctite
} from "Ducks/ims/loctite";

class ims_loctite_massupdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.removeFromAdjustment = this.removeFromAdjustment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAdjust = this.onAdjust.bind(this);
  }
  componentWillMount() {
    this.props.getAllLoctite();
  }
  handleSelect(val) {
    const newState = Object.assign([], this.state.selected);
    const inv = this.props.tableData.find(inv => inv.pid == val);
    newState.push(inv);
    this.setState({ selected: newState });
    this.props.removeFromLocList(val);
  }

  removeFromAdjustment(val) {
    const newState = Object.assign([], this.state.selected).filter(
      inv => inv.pid != val
    );
    this.setState({ selected: newState });
  }

  onAdjust(field, val, key) {
    const newState = Object.assign([], this.state.selected);
    const item = newState[key];
    item[field] = val;
    this.setState({ selected: newState });
  }

  handleSubmit() {
    this.props.massUpdateLoctite(this.state.selected);
  }

  render() {
    const { loading } = this.props;
    const { selected } = this.state;
    return (
      <React.Fragment>
        <div className="mb-50">
          <Helmet>
            <title>YSIS | Mass Update Loctite</title>
          </Helmet>
          <PageTitleBar title="Mass Update Loctite" />
          {loading && <RctSectionLoader />}
          <LoctiteFilter handleSelect={this.handleSelect} />
          <hr />
          <div className="row mb-30">
            <div className="col-md-12">
              <div className="d-flex justify-content-between">
                <h3>Adjustment List</h3>
                <Button
                  onClick={this.handleSubmit}
                  variant="contained"
                  className="btn-success text-white"
                >
                  Update
                </Button>
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Batch Num</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selected.length > 0 ? (
                    selected.map((item, key) => (
                      <LoctiteAdjustmentRow
                        key={key}
                        index={key}
                        item={item}
                        adjust={this.onAdjust}
                        remove={this.removeFromAdjustment}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No Items in list
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ imsState }) => {
  const { loctiteState } = imsState;
  const { loctiteList } = loctiteState;
  const { loading, tableData } = loctiteList;
  return { loading, tableData };
};

export default connect(
  mapStateToProps,
  {
    getAllLoctite,
    removeFromLocList,
    massUpdateLoctite
  }
)(ims_loctite_massupdate);
