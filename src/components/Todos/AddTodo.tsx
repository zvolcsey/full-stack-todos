import { useState } from "react";

interface AddTodoProps {
  handleAddTodo: (title: string) => void;
}

export default function AddTodo({ handleAddTodo }: AddTodoProps) {
  const [newTodo, setNewTodo] = useState("");

  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodo(newTodo);
    // Clear the input field after adding new todo
    setNewTodo("");
  };

  return (
    <form>
      <label htmlFor="add-todo">New Todo</label>
      <input
        type="text"
        id="add-todo"
        value={newTodo}
        onChange={handleNewTodo}
      />
      <button type="submit" onClick={handleSubmit}>
        Add New Todo
      </button>
    </form>
  );
}
