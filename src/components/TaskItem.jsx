function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className={`list-label${task.completed ? ' completed-task' : ''}`}>
        {task.text}
      </span>
      <button
        className="task-delete-button"
        type="button"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem