import React, { useState } from "react";
import Foo from "../Foo";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a todo..."
      />
      <button type="submit">
        <Foo>Add</Foo>
      </button>
    </form>
  );
}

export default TodoForm;
