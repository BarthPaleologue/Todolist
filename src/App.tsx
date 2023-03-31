import React from 'react';
import './App.css';
import { CreateTask } from './components/CreateTask';
import { Task } from './task';

enum AppStatus {
  CATEGORY_VIEW_MOBILE,
  LIST_VIEW_MOBILE,
  CREATE_TASK_VIEW_MOBILE,
  VIEW_DESKTOP
}

function App() {
  const [appStatus, setAppStatus] = React.useState(AppStatus.CREATE_TASK_VIEW_MOBILE);

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
      {
        {
          [AppStatus.CATEGORY_VIEW_MOBILE]: <div>Category view mobile</div>,
          [AppStatus.LIST_VIEW_MOBILE]: <div>List view mobile</div>,
          [AppStatus.CREATE_TASK_VIEW_MOBILE]: <CreateTask onCreateTask={handleCreateTask} onCancelCreation={handleCancelTaskCreation} />,
          [AppStatus.VIEW_DESKTOP]: <div>View desktop</div>
        }[appStatus]
      }
    </div>
  );
}

export default App;
