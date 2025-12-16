import { useEffect, useState } from "react";
import AddTodo from "./components/Todos/AddTodo";
import TodoList from "./components/Todos/TodoList";
import { v4 as uuidv4 } from "uuid";
import type { Todo } from "./app/types";

import styles from "./App.module.css";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Load todos from localStorage on initial render
    try {
      const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      setTodos(storedTodos);
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
    }
  }, []);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      isCompleted: false,
    };
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    try {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  };

  const handleTodoCompletion = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      id === todo.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    try {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    try {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  };

  let todosContent = <p>No todos yet - create a new one above!</p>;
  if (todos.length != 0) {
    todosContent = (
      <TodoList
        todos={todos}
        onToggleTodoCompletion={handleTodoCompletion}
        onDeleteTodo={handleDeleteTodo}
      />
    );
  }

  return (
    <>
      <header>
        <h1>React Todos</h1>
      </header>
      <main>
        <section aria-label="Add new todo">
          <AddTodo onAddTodo={handleAddTodo} />
        </section>
        <section className={`${styles.todos}`}>
          <h2>Todos</h2>
          {todosContent}
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Zoltán Völcsey. MIT License.</p>
      </footer>
    </>
  );
}
