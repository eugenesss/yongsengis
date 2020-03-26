import React from "react";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/icons";
import { IconButton, Menu, Button, TextField } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { invStockUpdate } from "Ducks/ims/inventory";

const StyledMenu = withStyles({
  paper: {
    padding: 10,
    minHeight: "120px",
    minWidth: "240px",
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

export default function QtyAdjust(props) {
  const dispatch = useDispatch();
  const { pid, name } = props;
  const [state, setState] = React.useState({ count: 0, results: "in" });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAlignment = (event, newAlignment) => {
    setState(prevState => ({ ...prevState, results: newAlignment }));
  };
  const handleCount = count => {
    setState(prevState => ({ ...prevState, count }));
  };

  const handleSave = () => {
    dispatch(invStockUpdate({ pid, ...state }));
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        size="small"
        onClick={handleClick}
      >
        <Input fontSize="small" />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <h5>Stock Quantity Adjustment</h5>
        <h6 className="fw-bold">{name}</h6>

        <div className="d-flex align-items-center">
          <TextField
            size="small"
            margin="dense"
            fullWidth
            id={`${pid}-stock`}
            type="number"
            label="Stock Count"
            variant="outlined"
            value={state.count}
            onChange={e => handleCount(e.target.value)}
          />
          <ToggleButtonGroup
            value={state.results}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            size="small"
            className="ml-5"
          >
            <ToggleButton value="in" aria-label="left aligned">
              In
            </ToggleButton>

            <ToggleButton value="out" aria-label="centered">
              Out
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="d-flex mt-10 justify-content-end">
          <Button
            onClick={handleSave}
            disabled={state.count === 0}
            size="small"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      </StyledMenu>
    </div>
  );
}
