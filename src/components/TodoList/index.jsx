import React from "react";
import TodoItem from "../TodoItem";
import Label from "../Label";

function TodoList({ todos, deleteTodo, toggleTodo }) {
  if (todos.length === 0) {
    return <Label>No todos yet! Add one above.</Label>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
