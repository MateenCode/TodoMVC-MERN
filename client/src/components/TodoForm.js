import React, { Component } from "react";
import axios from "axios";

export default class TodoForm extends Component {
  state = {
    title: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/todo", {
        title: this.state.title
      })
      .then(res => this.props.addTodo(res.data));
    this.setState({
      title: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button onSubmit={this.handleSubmit}>add</button>
      </form>
    );
  }
}
