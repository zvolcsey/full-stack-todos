import { useState } from "react";

import styles from "./AddTodo.module.css";

interface AddTodoProps {
  onAddTodo: (title: string) => void;
}

export default function AddTodo({ onAddTodo }: AddTodoProps) {
  const [newTodo, setNewTodo] = useState("");

  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(newTodo);
    // Clear the input field after adding new todo
    setNewTodo("");
  };

  return (
    <form className={styles["add-todo-form"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="add-todo">Todo Name</label>
        <input
          type="text"
          id="add-todo"
          autoFocus
          value={newTodo}
          onChange={handleNewTodo}
        />
      </div>
      <button type="submit" className="btn" onClick={handleSubmit}>
        Add New Todo
      </button>
    </form>
  );
}
