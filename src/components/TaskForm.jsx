import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    setTitle(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    setIsSubmitting(true)

    try {
      await onAdd(trimmedTitle)
      setTitle('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="Add a task"
        aria-label="New task"
        value={title}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <button
        className="task-add-button"
        type="submit"
        disabled={isSubmitting || !title.trim()}
        aria-label="Add task"
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}

export default TaskForm