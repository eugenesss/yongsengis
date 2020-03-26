import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import classnames from "classnames";
import moment from "moment";
import { getTheDate } from "Helpers/helpers";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import { Scrollbars } from "react-custom-scrollbars";
import { Delete, Edit } from "@material-ui/icons";
import {
  Fab,
  Button,
  List,
  ListItem,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

// Dialog new todo
import NewTodo from "./NewTodo";

// Action
import {
  getToDo,
  updateToDo,
  deleteToDo,
  newToDo
} from "Ducks/widget/TodoList";
import ViewTodo from "./ViewTodo";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTodo: false,
      todo: {}
    };
    this.openNewTodoDialog = this.openNewTodoDialog.bind(this);
    this.closeView = this.closeView.bind(this);
  }

  componentDidMount() {
    this.props.getToDo();
  }

  // open view todo dialog
  viewToDo(todo) {
    this.setState(prevState => ({ viewTodo: !prevState.viewTodo, todo }));
  }
  closeView() {
    this.setState(prevState => ({ viewTodo: !prevState.viewTodo, todo: {} }));
  }

  // open new todo dialog
  openNewTodoDialog() {
    this.props.show("new_todo", { submitToDo: this.props.newToDo });
  }
  // edit todo dialog
  editTodoDialog(edit) {
    this.props.show("new_todo", { submitToDo: this.props.updateToDo, edit });
  }
  // open delete todo dialog
  handleDelete(itemID, name) {
    this.props.show("alert_delete", {
      name: name,
      action: () => this.props.deleteToDo(itemID)
    });
  }

  // handle complete todo
  handleComplete(value, todo) {
    const completeTodo = Object.assign({}, todo);
    completeTodo.done = value;
    completeTodo.due_date = moment(todo.due_date).format("YYYY-MM-DD");
    this.props.updateToDo(completeTodo);
  }

  // handle delete todo

  render() {
    const { list, loading } = this.props;
    return (
      <React.Fragment>
        <BgCard fullBlock heading="To Do List">
          {loading && <RctSectionLoader />}
          <Scrollbars
            className="rct-scroll to-do-list"
            autoHeight
            autoHeightMin={100}
            autoHeightMax={420}
            autoHide
          >
            <List className="p-0">
              {list.length > 0 ? (
                list.map((data, key) => (
                  <ListItem
                    button
                    key={key}
                    onClick={() => this.viewToDo(data)}
                  >
                    <div
                      className={classnames(
                        "d-flex justify-content-between align-items-center w-100",
                        { strike: data.done }
                      )}
                    >
                      <div className="d-flex align-items-center clearfix">
                        <div className="float-left">
                          <FormControlLabel
                            className="mb-0"
                            control={
                              <Checkbox
                                checked={data.done}
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
                          <span className="text-muted">{data.description}</span>
                          {data.due_date && (
                            <span className="d-block fs-12 text-muted">
                              Due: {getTheDate(data.due_date)}
                            </span>
                          )}
                          {data.author && (
                            <span className="d-block fs-12 text-muted">
                              Created by: {data.author}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="hover-action">
                        <Fab
                          variant="round"
                          size="small"
                          className="btn-primary text-white mx-5"
                          onClick={() => this.editTodoDialog(data)}
                        >
                          <Edit fontSize="inherit" />
                        </Fab>
                        <Fab
                          variant="round"
                          size="small"
                          className="btn-danger text-white mx-5"
                          onClick={() =>
                            this.handleDelete(data.uid, data.title)
                          }
                        >
                          <Delete fontSize="inherit" />
                        </Fab>
                      </div>
                    </div>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <p className="w-100 text-center">No To Dos</p>
                </ListItem>
              )}
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
        <ViewTodo
          handleHide={this.closeView}
          show={this.state.viewTodo}
          view={this.state.todo}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProp = ({ widgetState }) => {
  const { todoList } = widgetState;
  const { loading, list } = todoList;
  return { loading, list };
};

export default connect(mapStateToProp, {
  show,
  getToDo,
  updateToDo,
  deleteToDo,
  newToDo
})(TodoList);
