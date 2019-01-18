import React from "react";

export default function Todo(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          textDecoration: props.todo.complete ? "line-through" : ""
        }}
        onClick={props.toggle}
      >
        {props.todo.title}
      </div>
      <button onClick={props.onDelete}>x</button>
    </div>
  );
}
