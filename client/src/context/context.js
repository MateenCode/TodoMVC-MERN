import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  if (action.type === "add") {
    return {
      todos: [action.payload, ...state.todos]
    };
  } else if (action.type === "delete") {
    return {
      todos: state.todos.filter(todo => todo._id !== action.payload)
    };
  } else if (action.type === "toggle") {
    return {
      todos: state.todos.map(todo => {
        if (todo._id === action.payload) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    };
  } else if (action.type === "delete_all") {
    return {
      todos: state.todos.filter(todo => !todo.complete)
    };
  } else {
    return state;
  }
};

export class Provider extends Component {
  state = {
    todos: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  componentWillMount() {
    axios.get("/api/todo").then(res => {
      this.setState({
        todos: res.data
      });
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
