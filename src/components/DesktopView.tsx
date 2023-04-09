import { useState } from "react";
import Categories from "./Categories";
import { CreateTask } from "./CreateTask";
import { ListView } from "./ListView";
import { Task, TaskList } from "../task";
import { loadListFromLocalStorage } from "../utils/localStorage";
import { IdleDesktopPanel } from "./IdleDesktopPanel";

interface DesktopViewProps {}

export function DesktopView({}: DesktopViewProps) {
    const [currentTasks, setCurrentTasks] = useState<Task[] | undefined>(undefined);
    const [currentListName, setCurrentListName] = useState<string | undefined>(undefined);
    const [currentEditTask, setCurrentEditTask] = useState<Task | undefined>(undefined);
    const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);

    return (
        <div className="desktopView">
            <Categories
                onCreateTaskPressed={() => {
                    setCurrentTasks(undefined);
                    setIsCreatingTask(true);
                }}
                onCategoryPressed={(listName) => {
                    const list = loadListFromLocalStorage(listName);
                    setCurrentTasks(list.tasks);
                    setCurrentListName(listName);
                }}
                onEditTaskRequested={(task: Task) => {
                    setCurrentEditTask(task);
                }}
            />
            {currentListName && (
                <ListView
                    listName={currentListName}
                    onCreateTaskPressed={() => setIsCreatingTask(true)}
                    onBackPressed={() => {}}
                    onRequireTaskEdit={(task: Task) => {
                        setCurrentEditTask(task);
                    }}
                />
            )}
            {(isCreatingTask || currentEditTask) && (
                <CreateTask
                    onCreateTask={(newTask: Task, listName: string) => {
                        setCurrentListName(listName);
                        setIsCreatingTask(false);
                    }}
                    onEditTask={(oldTask: Task, newTask: Task, listName: string) => {
                        setCurrentListName(listName);
                        setIsCreatingTask(false);
                        setCurrentEditTask(undefined);
                    }}
                    onCancelCreation={() => {
                        setCurrentListName(undefined);
                        setIsCreatingTask(false);
                        setCurrentEditTask(undefined);
                    }}
                    defaultListName={currentListName}
                    taskToEdit={currentEditTask}
                />
            )}
            {!currentListName && !isCreatingTask && !currentEditTask && <IdleDesktopPanel />}
        </div>
    );
}
