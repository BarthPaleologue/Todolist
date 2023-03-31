import React from 'react';
import './App.css';
import { CreateTask } from './components/CreateTask';
import { Task } from './task';

function App() {
  function handleCreateTask(newTask: Task) {
    console.table(newTask);
    // Perform any other logic with the new task title
  }

  function handleCancelTaskCreation() {
    console.log('Canceling task creation');
    // Perform any other logic
  }

  return (
    <div className="App">
      <CreateTask onCreateTask={handleCreateTask} onCancelCreation={handleCancelTaskCreation} />
    </div>
  );
}

export default App;
