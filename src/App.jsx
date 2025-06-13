import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now(), text, completed: false }]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const addDemoTodos = () => {
    const demoTodos = Array.from({ length: 100 }, (_, i) => ({
      id: Date.now() + i,
      text: `Sample Todo Item ${i + 1}`,
      completed: Math.random() > 0.7,
    }));
    setTodos([...todos, ...demoTodos]);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="app-controls">
        <TodoForm addTodo={addTodo} />
        {todos.length < 20 && (
          <button className="demo-button" onClick={addDemoTodos}>
            Add 100 Sample Todos
          </button>
        )}
      </div>
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
