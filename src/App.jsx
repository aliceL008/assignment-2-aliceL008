import './App.css'
import { useState } from 'react'
import TaskCounter from './components/TaskCounter'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import calendarIcon from './assets/calendar_icon.png'
import checkIcon from './assets/check_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'


// Assignment 2: build the Task Manager here.
// Step 1 (after the Oct 12 class): hard-coded tasks, the five components, props.
// Step 2 (after the Oct 19 class): useState, the controlled form, toggle, delete, filtering.
function App() {

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call Mom', completed: false },
    { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
    { id: 3, text: 'Return the textbook to Josie', completed: false },
    { id: 4, text: 'Buy the new album by Rake', completed: false },
    { id: 5, text: 'Buy a gift card for Dad', completed: false },
  ])

  function handleToggle(id) {
    setTasks((currentTasks) =>
    currentTasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
      )
    )
  }

  function handleAdd(title) {
    setTasks((currentTasks) => [
    ...currentTasks,
    { id: Date.now(), text: title, completed: false },
    ])
  }

  function handleDelete(id) {
    setTasks((currentTasks) =>
    currentTasks.filter((task) => task.id !== id)
    )
  }

  const [filter, setFilter] = useState('all'); // all, active, completed

  // Derived state - computed from existing state
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  })

  function getButtonClass(filterName) {
  if (filter === filterName) {
    return 'active'
  }
  return ''
  } ;

  return (
    <div className="page">
      <header>
        <div className="site-header">
          <button type="button" aria-label="Open menu">
            <img src={menuIcon} alt="Menu" />
          </button>
          <div className="searchbar">
            <input type="text" placeholder="Quick find" aria-label="Quick find" />
            <img src={searchIcon} alt="" aria-hidden="true" />
          </div>
          <aside className="header-count">
            <img src={checkIcon} alt="" aria-hidden="true" />
            <TaskCounter tasks={tasks} />
          </aside>
        </div>
      </header>

      <main className="site-main">
        <aside className="navbar">
          <nav aria-label="Task lists">
            <ul>
              <li><img src={inboxIcon} alt="" aria-hidden="true" /> Inbox <span className="count5">{tasks.length}</span></li>
              <li><img src={calendarIcon} alt="" aria-hidden="true" /> Today <span className="count5">5</span></li>
              <li><img src={upcomingIcon} alt="" aria-hidden="true" /> Upcoming</li>
            </ul>
          </nav>
        </aside>

        <section className="main-content">
          <h1>Inbox</h1>
          <div className="task-filters">
            <button
              className={getButtonClass('all')}
              type="button"
              onClick={() => setFilter('all')}
            >
            All
            </button>

            <span> | </span>
            <button
              className={getButtonClass('active')}
              type="button"
              onClick={() => setFilter('active')}
            >
            Active
            </button>
            <span> | </span>

            <button
              className={getButtonClass('completed')}
              type="button"
              onClick={() => setFilter('completed')}
            >
            Completed
            </button>
            
          </div>
          <TaskForm onAdd={handleAdd} />
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
    
          />
        </section>
      </main>
    </div>
  )
}

export default App
