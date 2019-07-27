import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class ListViewSelector extends Component {
  state = {
    dropdownOpen: false
  };
  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }
  render() {
    const { options, nowShowing, onChangeValue } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
        <DropdownToggle color="dark" className="text-white" caret>
          {nowShowing}
        </DropdownToggle>
        <DropdownMenu>
          {options.map((opt, key) => {
            return (
              <DropdownItem
                style={{ padding: "0.45rem 1.5rem" }}
                onClick={() => onChangeValue(opt)}
                key={key}
              >
                {opt}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ListViewSelector;
