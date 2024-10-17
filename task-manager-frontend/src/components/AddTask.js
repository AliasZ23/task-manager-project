import React, { useState } from 'react';
import axios from 'axios';

function AddTask({ setTasks }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/tasks', { title })
      .then(response => {
        setTasks(prevTasks => [...prevTasks, response.data]);
        setTitle('');  // Clear the input field
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;
