import React from "react";
import "./App.css";
import { Categories, TODAY } from "./components/Categories";
import { Presentation } from "./components/Presentation";
import { CreateTask } from "./components/CreateTask";
import { Task, TaskList } from "./task";
import { emptyLocalStorage, loadListFromLocalStorage, loadTodosFromLocalStorage, populateLocalStorage, saveTodosToLocalStorage } from "./utils/localStorage";
import { ListView } from "./components/ListView";
import { isTaskInList, getDayTask } from "./utils/taskFinding";
import { DesktopView } from "./components/DesktopView";

enum AppStatus {
    CATEGORY_VIEW_MOBILE = "CATEGORY_VIEW_MOBILE",
    LIST_VIEW_MOBILE = "LIST_VIEW_MOBILE",
    CREATE_TASK_VIEW_MOBILE = "CREATE_TASK_VIEW_MOBILE",
    FIRST_PRESENTATION_MOBILE = "FIRST_PRESENTATION_MOBILE",
    DESKTOP_VIEW = "DESKTOP_VIEW"
}

const MOBILE_WIDTH_THRESHOLD = 768;

function App() {
    const [isOnMobile, setIsOnMobile] = React.useState(window.innerWidth < MOBILE_WIDTH_THRESHOLD);

    window.addEventListener("resize", () => {
        const newIsOnMobile = window.innerWidth < MOBILE_WIDTH_THRESHOLD;
        if (newIsOnMobile !== isOnMobile) {
            setIsOnMobile(newIsOnMobile);
        }
    });

    const [appStatus, setAppStatus] = React.useState(isOnMobile ? AppStatus.FIRST_PRESENTATION_MOBILE : AppStatus.DESKTOP_VIEW);

    // The current list when in list view (can be passed to the creation view)
    const [currentListName, setCurrentListName] = React.useState<string | undefined>(undefined);

    // The current task edited (can be passed to the creation view)
    const [currentTask, setCurrentTask] = React.useState<Task | undefined>(undefined);

    const [currentTasks, setCurrentTasks] = React.useState<Task[]>([]);

    const mobileViews: { [key in AppStatus]: React.ReactElement } = {
        [AppStatus.CATEGORY_VIEW_MOBILE]: (
            <Categories
                onCreateTaskPressed={() => {
                    setCurrentTask(undefined);
                    setAppStatus(AppStatus.CREATE_TASK_VIEW_MOBILE);
                }}
                onCategoryPressed={(categoryName) => {
                    setCurrentListName(categoryName);
                    if (categoryName === TODAY) {
                        setCurrentTasks(getDayTask(new Date(),loadTodosFromLocalStorage().flatMap((cat) => cat.tasks)));
                    } else {
                        setCurrentTasks(loadListFromLocalStorage(categoryName).tasks);
                    }
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
                givenTasks={currentTasks}
                onCreateTaskPressed={() => {
                    setCurrentTask(undefined);
                    setAppStatus(AppStatus.CREATE_TASK_VIEW_MOBILE);
                }}
                onBackPressed={() => {
                    setAppStatus(AppStatus.CATEGORY_VIEW_MOBILE);
                }}
                onRequireTaskEdit={(task) => {
                    setCurrentTask(task);
                    setAppStatus(AppStatus.CREATE_TASK_VIEW_MOBILE);
                }}
                onDeleteTask={(tasks) => {
                    setCurrentTasks(tasks);
                }}
            />
        ),
        [AppStatus.CREATE_TASK_VIEW_MOBILE]: (
            <CreateTask
                onCreateTask={(task: Task, listName: string) => {
                    setCurrentListName(listName);
                    if (listName === TODAY){
                        setCurrentTasks(getDayTask(new Date(),loadTodosFromLocalStorage().flatMap((cat) => cat.tasks)));
                    } else {
                        setCurrentTasks(loadListFromLocalStorage(listName).tasks);
                    }
                    setAppStatus(AppStatus.LIST_VIEW_MOBILE);
                }}
                onEditTask={(oldTask: Task, task: Task, listName: string) => {
                    setCurrentListName(listName);
                    setCurrentTasks(loadListFromLocalStorage(listName).tasks);
                    setAppStatus(AppStatus.LIST_VIEW_MOBILE);
                }}
                taskToEdit={currentTask}
                defaultListName={currentListName}
                onCancelCreation={() => {
                    setAppStatus(AppStatus.LIST_VIEW_MOBILE);
                }}
            />
        ),
        [AppStatus.FIRST_PRESENTATION_MOBILE]: (
            <Presentation
                onOK={() => {
                    setAppStatus(AppStatus.CATEGORY_VIEW_MOBILE);
                }}
            />
        ),
        [AppStatus.DESKTOP_VIEW]: <DesktopView />
    };

    return <div className="App">{mobileViews[appStatus]}</div>;
}

export default App;
