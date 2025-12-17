import type { Todo } from "../../app/types";

import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggleCompletion,
  onDelete,
}: TodoItemProps) {
  const { id, title, isCompleted } = todo;

  return (
    <li className={`${styles["todo-item"]}`}>
      <div className={`${styles.left}`}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggleCompletion(id)}
        />
        <span>{title}</span>
      </div>
      <button
        className={`btn ${styles.deleteButton}`}
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}
