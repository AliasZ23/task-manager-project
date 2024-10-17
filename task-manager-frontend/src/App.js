import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => {
        setTasks(response.data);  // Set the fetched tasks to the state
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <AddTask setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
