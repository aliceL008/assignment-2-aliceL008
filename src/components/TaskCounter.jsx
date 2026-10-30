function TaskCounter({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length

  return (
    <p>{tasks.length} / {completedTasks}</p>
  )
}

export default TaskCounter