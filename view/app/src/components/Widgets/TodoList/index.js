import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

import BgCard from "Components/BgCard";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import classnames from "classnames";
import Button from "@material-ui/core/Button";

// Dialog new todo
import NewTodo from "./NewTodo";

import { Scrollbars } from "react-custom-scrollbars";

// rct section loader
import RctSectionLoader from "Components/RctSectionLoader";
import { Delete } from "@material-ui/icons";
import { Fab } from "@material-ui/core";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.openNewTodoDialog = this.openNewTodoDialog.bind(this);
  }

  // open new todo dialog
  openNewTodoDialog() {
    this.props.show("new_todo");
  }

  // handle complete todo
  handleComplete(value, todo) {
    console.log(value, todo);
  }

  // handle delete todo

  render() {
    const { list, loading } = this.props;
    return (
      <React.Fragment>
        <BgCard fullBlock heading="To Do List">
          <Scrollbars
            className="rct-scroll"
            autoHeight
            autoHeightMin={100}
            autoHeightMax={420}
            autoHide
          >
            <List className="p-0">
              {list.length > 0 &&
                list.map((data, key) => (
                  <ListItem
                    className="border-bottom"
                    button
                    key={key}
                    onClick={() => this.handleComplete(!data.completed, data)}
                  >
                    <div
                      className={classnames(
                        "d-flex justify-content-between align-items-center w-100",
                        { strike: data.completed }
                      )}
                    >
                      <div className="d-flex align-items-center clearfix">
                        <div className="float-left">
                          <FormControlLabel
                            className="mb-0"
                            control={
                              <Checkbox
                                checked={data.completed}
                                color="primary"
                                onChange={event =>
                                  this.handleComplete(
                                    event.target.checked,
                                    data
                                  )
                                }
                              />
                            }
                          />
                        </div>
                        <div className="float-left">
                          <p className="mb-0">{data.title}</p>
                          {data.date && (
                            <span className="d-block fs-12 text-muted">
                              {data.date}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="hover-action">
                        <Fab
                          variant="round"
                          size="small"
                          className="btn-danger text-white"
                          // onClick={e => this.onDeleteTask(e, data)}
                        >
                          <Delete style={{ fontStyle: 16 }} />
                        </Fab>
                      </div>
                    </div>
                  </ListItem>
                ))}
            </List>
          </Scrollbars>
          <div className="d-flex p-3">
            <Button
              variant="contained"
              color="primary"
              className="text-white"
              onClick={() => this.openNewTodoDialog()}
            >
              Add New
            </Button>
          </div>
        </BgCard>
        <NewTodo />
      </React.Fragment>
    );
  }
}

const mapStateToProp = ({ widgetState }) => {
  const { todoList } = widgetState;
  const { loading, list } = todoList;
  return { loading, list };
};

export default connect(mapStateToProp, { show })(TodoList);
