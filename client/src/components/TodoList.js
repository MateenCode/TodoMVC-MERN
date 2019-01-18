import React, { Component } from "react";
import { Consumer } from "../context/context";

import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";

/*
  TodoMVC
  1. add todo
  2. display todos
  3. cross off todo
  4. show number of active todos
  5. filter all/active/complete
  6. delete todo
  7. delete all complete
    7.1 only show if atleast one is complete
  8. button to toggle all on/off
    DONT USE Arrow function is JSX
*/

export default class TodoList extends Component {
  addTodo = (dispatch, todo) => {
    dispatch({
      type: "add",
      payload: todo
    });
  };

  onDelete = (dispatch, id) => {
    axios.delete(`/api/todo/${id}`).then(() =>
      dispatch({
        type: "delete",
        payload: id
      })
    );
  };

  toggle = (dispatch, id) => {
    axios.patch(`/api/todo/${id}`).then(() => {
      dispatch({
        type: "toggle",
        payload: id
      });
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, todos } = value;
          return (
            <React.Fragment>
              <TodoForm addTodo={this.addTodo.bind(this, dispatch)} />
              {todos.map(todo => {
                return (
                  <Todo
                    key={todo._id}
                    todo={todo}
                    onDelete={this.onDelete.bind(this, dispatch, todo._id)}
                    toggle={this.toggle.bind(this, dispatch, todo._id)}
                  />
                );
              })}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}