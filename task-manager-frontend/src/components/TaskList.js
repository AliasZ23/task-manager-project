import React from 'react';
import Task from './Task';

function TaskList({ tasks, setTasks }) {
  return (
    <div>
      {tasks.map(task => (
        <Task key={task._id} task={task} setTasks={setTasks} />
      ))}
    </div>
  );
}

export default TaskList;
