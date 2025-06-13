import React from "react";
import Label from "../Label";

function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <Label>{todo.text}</Label>
      <div className="todo-actions">
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;
