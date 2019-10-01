import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { onChangeUpdateGroup, updateGroup, deleteGroup, onChangeRemoveGroupRole, onChangeAddGroupRole, onChangeTierNum } from "Actions";

const styles = theme => ({
  root: {
    display: "block"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  table: {
    minHeight: 0
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
});

class GroupsManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,

      accessRoles,
      selectedGroup,
      selectedGroupRoles,
      selectedRoleGroups,
      unselectedRoleGroups,
      updateGroup,
      onChangeUpdateGroup,
      onChangeAddGroupRole,
      onChangeRemoveGroupRole,
      onChangeTierNum,
      removedRoleName,
      addedRoleName,
      deleteGroup
    } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Row>
            <Col md={12}>
              <TextField
                fullWidth
                required
                error={selectedGroup ? !selectedGroup.name : false}
                disabled={!selectedGroup || selectedGroup.name == "Company"}
                id="name"
                label="Group Name"
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                value={
                  selectedGroup
                    ? selectedGroup.name == "Company"
                      ? "Company (default group applied to all users)"
                      : selectedGroup.name
                    : ""
                }
                onChange={e => onChangeUpdateGroup("name", e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Roles</TableCell>
                  <TableCell align="center">Tier 1</TableCell>
                  <TableCell align="center">Tier 2</TableCell>
                  <TableCell align="center">Tier 3</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedGroupRoles &&
                  selectedGroupRoles.map((r, index) => {
                    return (
                      <TableRow className={classes.row} key={index + r.id}>
                        <TableCell component="th" scope="row">
                          {r.name}
                        </TableCell>
                        <TableCell align="center">
                          <Radio
                            checked={r.tier == 1}
                            value={r.id + "-" + 1}
                            color="primary"
                            onChange={(e, checked) => { onChangeTierNum(e.target.value); }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Radio
                            checked={r.tier == 2}
                            value={r.id + "-" + 2}
                            color="primary"
                            onChange={(e, checked) => { onChangeTierNum(e.target.value); }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Radio
                            checked={r.tier == 3}
                            value={r.id + "-" + 3}
                            color="primary"
                            onChange={(e, checked) => { onChangeTierNum(e.target.value); }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Row>
          <Row>
            <Col md={6}>
              <TextField
                select
                fullWidth
                required
                error={selectedGroup ? !selectedGroup.name : false}
                disabled={!selectedGroup || selectedRoleGroups.length == 0}
                id="name"
                label="Remove Role from Group"
                className={classes.textField}
                value={removedRoleName}
                onChange={e => onChangeRemoveGroupRole(e.target.value)}
                margin="normal"
              >
                {selectedRoleGroups.map(role => {
                  return (
                    <MenuItem key={role.id} value={role.id}>
                      <ListItemText primary={role.name} />
                    </MenuItem>
                  );
                })}
              </TextField>
            </Col>
            <Col md={6}>
              <TextField
                select
                fullWidth
                required
                error={selectedGroup ? !selectedGroup.name : false}
                disabled={!unselectedRoleGroups || unselectedRoleGroups.length == 0}
                id="name"
                label="Add Role to Group"
                className={classes.textField}
                value={addedRoleName}
                onChange={e => onChangeAddGroupRole(e.target.value)}
                margin="normal"
              >
                {unselectedRoleGroups.map(role => {
                  return (
                    <MenuItem key={role.id} value={role.id}>
                      <ListItemText primary={role.name} />
                    </MenuItem>
                  );
                })}
              </TextField>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="contained"
                color="secondary"
                className="text-white mb-10 mt-10"
                disabled={selectedGroup ? selectedGroup.id == 0 : true}
                onClick={() => deleteGroup()}
              >
                Delete
              </Button>
            </Col>
            <Col>
              <Button
                variant="contained"
                color="primary"
                className="text-white mb-10 mt-10 float-right"
                onClick={() => updateGroup()}
              >
                Save
              </Button>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

GroupsManager.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ groupsState, rolesState }) => {
  const { selectedRoleGroups, unselectedRoleGroups, accessRoles, addedRoleName, removedRoleName } = rolesState;
  const { selectedGroup, selectedGroupRoles } = groupsState;
  return {
    selectedRoleGroups,
    unselectedRoleGroups,
    accessRoles,
    selectedGroup,
    selectedGroupRoles,
    addedRoleName,
    removedRoleName
  };
};

export default connect(
  mapStateToProps,
  { onChangeUpdateGroup, updateGroup, deleteGroup, onChangeAddGroupRole, onChangeRemoveGroupRole, onChangeTierNum }
)(withStyles(styles)(GroupsManager));
