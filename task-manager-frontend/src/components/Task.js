import React from 'react';
import axios from 'axios';

function Task({ task, setTasks }) {
  // Mark task as completed
  const completeTask = () => {
    axios.patch(`http://localhost:5000/api/tasks/${task._id}`, { completed: true })
      .then(response => {
        setTasks(prevTasks => prevTasks.map(t => t._id === task._id ? response.data : t));
      })
      .catch(error => console.error('Error completing task:', error));
  };

  // Delete task
  const deleteTask = () => {
    axios.delete(`http://localhost:5000/api/tasks/${task._id}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(t => t._id !== task._id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h2>{task.title} {task.completed ? "(Completed)" : ""}</h2>
      <button onClick={completeTask}>Complete</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}

export default Task;
