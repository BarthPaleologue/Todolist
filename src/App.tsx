import React from 'react';
import './App.css';
import Categories from './components/Categories';
import { Presentation } from './components/Presentation';
import { CreateTask } from './components/CreateTask';
import { Task, TaskList } from './task';
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from './utils/localStorage';

enum AppStatus {
  CATEGORY_VIEW_MOBILE,
  LIST_VIEW_MOBILE,
  CREATE_TASK_VIEW_MOBILE,
  VIEW_DESKTOP,
  FIRST_PRESENTATION_MOBILE,
}

function App() {
  const [appStatus, setAppStatus] = React.useState(AppStatus.CREATE_TASK_VIEW_MOBILE);

  const isOnMobile = window.innerWidth < 768;

  const todoList: TaskList[] = loadTodosFromLocalStorage();

  function handleCreateTask(newTask: Task, listName: string) {
    console.table(newTask);

    const list = todoList.find((list) => list.title === listName);
    if (list === undefined) {
      todoList.push({
        title: listName,
        tasks: [newTask]
      });
    } else {
      list.tasks.push(newTask);
    }

    saveTodosToLocalStorage(todoList);

    console.log(todoList);

    setAppStatus(isOnMobile ? AppStatus.CATEGORY_VIEW_MOBILE : AppStatus.VIEW_DESKTOP);
  }

  function handleCancelTaskCreation() {
    console.log('Canceling task creation');
    // Perform any other logic
    setAppStatus(isOnMobile ? AppStatus.CATEGORY_VIEW_MOBILE : AppStatus.VIEW_DESKTOP);
  }

  return (
    <div className="App">
      <Presentation></Presentation>
      {
        {
          [AppStatus.CATEGORY_VIEW_MOBILE]: <Categories />,
          [AppStatus.LIST_VIEW_MOBILE]: <div>List view mobile</div>,
          [AppStatus.CREATE_TASK_VIEW_MOBILE]: <CreateTask onCreateTask={handleCreateTask} onCancelCreation={handleCancelTaskCreation} />,
          [AppStatus.VIEW_DESKTOP]: <div>View desktop</div>,
          [AppStatus.FIRST_PRESENTATION_MOBILE]: <Presentation />,
        }[appStatus]
      }
      <Categories></Categories>
    </div>
  );
}

export default App;
