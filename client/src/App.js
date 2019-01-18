import React, { Component } from "react";
import Todolist from "./components/TodoList";
import { Provider } from "./context/context";
import "./css/App.css";

export default class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <Todolist />
        </div>
      </Provider>
    );
  }
}
