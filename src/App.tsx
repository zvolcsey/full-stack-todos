import { useState } from "react";
import AddTodo from "./components/Todos/AddTodo";
import TodoList from "./components/Todos/TodoList";
import { v4 as uuidv4 } from "uuid";
import type { Todo } from "./app/types";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  let todosContent = <p>No todos yet - create a new one above!</p>;
  if (todos.length != 0) {
    todosContent = <TodoList todos={todos} />;
  }

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      isCompleted: false,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const handleDeleteTodo = (id: string) => {
    // Delete todo logic here
  };

  return (
    <>
      <header>
        <h1>React Todos</h1>
      </header>
      <main>
        <AddTodo handleAddTodo={handleAddTodo} />
        <section>
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
