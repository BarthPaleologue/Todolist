import React from 'react';
import './App.css';
import { CreateTask } from './components/CreateTask';
import { Task } from './task';
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from './utils/localStorage';

enum AppStatus {
  CATEGORY_VIEW_MOBILE,
  LIST_VIEW_MOBILE,
  CREATE_TASK_VIEW_MOBILE,
  VIEW_DESKTOP
}

function App() {
  const [appStatus, setAppStatus] = React.useState(AppStatus.CREATE_TASK_VIEW_MOBILE);

  const isOnMobile = window.innerWidth < 768;

  const todoList: Task[] = loadTodosFromLocalStorage();

  function handleCreateTask(newTask: Task) {
    console.table(newTask);

    todoList.push(newTask);
    saveTodosToLocalStorage(todoList);

    setAppStatus(isOnMobile ? AppStatus.CATEGORY_VIEW_MOBILE : AppStatus.VIEW_DESKTOP);
  }

  function handleCancelTaskCreation() {
    console.log('Canceling task creation');
    // Perform any other logic
    setAppStatus(isOnMobile ? AppStatus.CATEGORY_VIEW_MOBILE : AppStatus.VIEW_DESKTOP);
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
