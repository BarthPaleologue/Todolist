import React, { useEffect, useState } from "react";
import "./App.css";
import { Categories, TODAY } from "./components/Categories";
import { Presentation } from "./components/Presentation";
import { CreateTask } from "./components/CreateTask";
import { Task, TaskList } from "./task";
import { emptyLocalStorage, loadListFromLocalStorage, loadTodosFromLocalStorage, populateLocalStorage, saveTodosToLocalStorage } from "./utils/localStorage";
import { ListView } from "./components/ListView";
import { isTaskInList, getDayTask } from "./utils/taskFinding";
import { DesktopView } from "./components/DesktopView";
import { BrowserView, MobileView } from "react-device-detect";

enum MobileState {
    CATEGORY_VIEW = "CATEGORY_VIEW_MOBILE",
    LIST_VIEW = "LIST_VIEW_MOBILE",
    CREATE_TASK_VIEW = "CREATE_TASK_VIEW_MOBILE",
    FIRST_PRESENTATION = "FIRST_PRESENTATION_MOBILE"
}

function App() {
    const [mobileState, setMobileState] = useState(MobileState.FIRST_PRESENTATION);

    // The current list when in list view (can be passed to the creation view)
    const [currentListName, setCurrentListName] = React.useState<string | undefined>(undefined);

    // The current task edited (can be passed to the creation view)
    const [currentTask, setCurrentTask] = React.useState<Task | undefined>(undefined);

    const [currentTasks, setCurrentTasks] = React.useState<Task[]>([]);

    const mobileViews: { [key in MobileState]: React.ReactElement } = {
        [MobileState.CATEGORY_VIEW]: (
            <Categories
                onCreateTaskPressed={() => {
                    setCurrentTask(undefined);
                    setMobileState(MobileState.CREATE_TASK_VIEW);
                }}
                onCategoryPressed={(categoryName) => {
                    setCurrentListName(categoryName);
                    if (categoryName === TODAY) {
                        setCurrentTasks(
                            getDayTask(
                                new Date(),
                                loadTodosFromLocalStorage().flatMap((cat) => cat.tasks)
                            )
                        );
                    } else {
                        setCurrentTasks(loadListFromLocalStorage(categoryName).tasks);
                    }
                    setMobileState(MobileState.LIST_VIEW);
                }}
                onEditTaskRequested={(task) => {
                    const todos = loadTodosFromLocalStorage();
                    const listName = todos.find((list) => isTaskInList(task, list))?.title;
                    setCurrentListName(listName);
                    setCurrentTask(task);
                    setMobileState(MobileState.CREATE_TASK_VIEW);
                }}
            />
        ),
        [MobileState.LIST_VIEW]: (
            <ListView
                listName={currentListName ?? ""}
                givenTasks={currentTasks}
                onCreateTaskPressed={() => {
                    setCurrentTask(undefined);
                    setMobileState(MobileState.CREATE_TASK_VIEW);
                }}
                onBackPressed={() => {
                    setMobileState(MobileState.CATEGORY_VIEW);
                }}
                onRequireTaskEdit={(task) => {
                    setCurrentTask(task);
                    setMobileState(MobileState.CREATE_TASK_VIEW);
                }}
                onDeleteTask={(tasks) => {
                    setCurrentTasks(tasks);
                }}
            />
        ),
        [MobileState.CREATE_TASK_VIEW]: (
            <CreateTask
                onCreateTask={(task: Task, listName: string) => {
                    setCurrentListName(listName);
                    if (listName === TODAY) {
                        setCurrentTasks(
                            getDayTask(
                                new Date(),
                                loadTodosFromLocalStorage().flatMap((cat) => cat.tasks)
                            )
                        );
                    } else {
                        setCurrentTasks(loadListFromLocalStorage(listName).tasks);
                    }
                    setMobileState(MobileState.LIST_VIEW);
                }}
                onEditTask={(oldTask: Task, task: Task, listName: string) => {
                    setCurrentListName(listName);
                    if (listName === TODAY) {
                        setCurrentTasks(
                            getDayTask(
                                new Date(),
                                loadTodosFromLocalStorage().flatMap((cat) => cat.tasks)
                            )
                        );
                    } else {
                        setCurrentTasks(loadListFromLocalStorage(listName).tasks);
                    }
                    setMobileState(MobileState.LIST_VIEW);
                }}
                taskToEdit={currentTask}
                defaultListName={currentListName}
                onCancelCreation={() => {
                    if (currentListName) setMobileState(MobileState.LIST_VIEW);
                    else setMobileState(MobileState.CATEGORY_VIEW);
                }}
            />
        ),
        [MobileState.FIRST_PRESENTATION]: (
            <Presentation
                onOK={() => {
                    setMobileState(MobileState.CATEGORY_VIEW);
                }}
            />
        )
    };

    return (
        <div className="App">
            <BrowserView>
                <DesktopView />
            </BrowserView>
            <MobileView>{mobileViews[mobileState]}</MobileView>
        </div>
    );
}

export default App;
