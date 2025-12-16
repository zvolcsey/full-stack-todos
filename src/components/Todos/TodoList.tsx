import TodoItem from "./TodoItem";
import type { Todo } from "../../app/types";

import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  onToggleTodoCompletion: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggleTodoCompletion,
  onDeleteTodo,
}: TodoListProps) {
  return (
    <ul className={`${styles["todo-list"]}`}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompletion={onToggleTodoCompletion}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
}
