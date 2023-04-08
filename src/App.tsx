import React from "react";
import "./App.css";
import Categories from "./components/Categories";
import { Presentation } from "./components/Presentation";
import { CreateTask } from "./components/CreateTask";
import { Task, TaskList } from "./task";
import { emptyLocalStorage, loadTodosFromLocalStorage, populateLocalStorage, saveTodosToLocalStorage } from "./utils/localStorage";
import { ListView } from "./components/ListView";
import { isTaskInList } from "./utils/taskFinding";

enum AppStatus {
    CATEGORY_VIEW_MOBILE,
    LIST_VIEW_MOBILE,
    CREATE_TASK_VIEW_MOBILE,
    VIEW_DESKTOP,
    FIRST_PRESENTATION_MOBILE
}

function App() {
    const [appStatus, setAppStatus] = React.useState(AppStatus.FIRST_PRESENTATION_MOBILE);

    // The current list when in list view (can be passed to the creation view)
    const [currentListName, setCurrentListName] = React.useState<string | undefined>(undefined);

    // The current task edited (can be passed to the creation view)
    const [currentTask, setCurrentTask] = React.useState<Task | undefined>(undefined);

    const isOnMobile = window.innerWidth < 768;

    return (
        <div className="App">
            {
                {
                    [AppStatus.CATEGORY_VIEW_MOBILE]: (
                        <Categories
                            onCreateTaskPressed={() => {
                                setCurrentTask(undefined);
                                setAppStatus(AppStatus.CREATE_TASK_VIEW_MOBILE);
                            }}
                            onCategoryPressed={(categoryName) => {
                                setCurrentListName(categoryName);
                                setAppStatus(AppStatus.LIST_VIEW_MOBILE);
                            }}
                            onEditTaskRequested={(task) => {
                                const todos = loadTodosFromLocalStorage();
                                const listName = todos.find((list) => isTaskInList(task, list))?.title;
                                setCurrentListName(listName);
                                setCurrentTask(task);
                                setAppStatus(AppStatus.CREATE_TASK_VIEW_MOBILE);
                            }}
                        />
                    ),
                    [AppStatus.LIST_VIEW_MOBILE]: (
                        <ListView
                            listName={currentListName ?? ""}
                            onCreateTaskPressed={() => {
                                setCurrentTask(undefined);
                                setAppStatus(AppStatus.CREATE_TASK_VIEW_MOBILE);
                            }}
                            onBackPressed={() => {
                                setCurrentListName(undefined);
                                setAppStatus(AppStatus.CATEGORY_VIEW_MOBILE);
                            }}
                            onRequireTaskEdit={(task) => {
                                setCurrentTask(task);
                                setAppStatus(AppStatus.CREATE_TASK_VIEW_MOBILE);
                            }}
                        />
                    ),
                    [AppStatus.CREATE_TASK_VIEW_MOBILE]: (
                        <CreateTask
                            onCreateTask={(newTask: Task, listName: string) => {
                                setCurrentListName(listName);
                                setAppStatus(AppStatus.LIST_VIEW_MOBILE);
                            }}
                            onEditTask={(oldTask: Task, newTask: Task, listName: string) => {
                                setCurrentListName(listName);
                                setAppStatus(AppStatus.LIST_VIEW_MOBILE);
                            }}
                            onCancelCreation={() => {
                                setAppStatus(AppStatus.CATEGORY_VIEW_MOBILE);
                                setCurrentListName(undefined);
                            }}
                            defaultListName={currentListName}
                            taskToEdit={currentTask}
                        />
                    ),
                    [AppStatus.VIEW_DESKTOP]: <div>View desktop</div>,
                    [AppStatus.FIRST_PRESENTATION_MOBILE]: <Presentation onOK={() => setAppStatus(AppStatus.CATEGORY_VIEW_MOBILE)} />
                }[appStatus]
            }
        </div>
    );
}

export default App;
