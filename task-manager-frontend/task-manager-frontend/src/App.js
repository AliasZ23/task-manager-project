import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from './TaskList';
import AddTask from './AddTask';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  // Function to add a new task
  const addTask = (title) => {
    axios.post('http://localhost:5000/api/tasks', { title })
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => {
        console.error("There was an error adding the task!", error);
      });
  };

  // Function to delete a task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the task!", error);
      });
  };

  // Function to mark a task as completed
  const completeTask = (id) => {
    axios.patch(`http://localhost:5000/api/tasks/${id}`, { completed: true })
      .then(() => {
        setTasks(tasks.map(task => task._id === id ? { ...task, completed: true } : task));
      })
      .catch(error => {
        console.error("There was an error completing the task!", error);
      });
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
