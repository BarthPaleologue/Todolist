import { useState } from "react";
import Categories, { TODAY } from "./Categories";
import { CreateTask } from "./CreateTask";
import { ListView } from "./ListView";
import { Task } from "../task";
import { hasAcceptedTerms, loadListFromLocalStorage, loadTodosFromLocalStorage } from "../utils/localStorage";
import { IdleDesktopPanel } from "./IdleDesktopPanel";
import { getDayTask, getTodaysTasks } from "../utils/taskFinding";
import { AgendaView } from "./AgendaView";
import { toast } from "react-toastify";
import { Presentation } from "./Presentation";

interface DesktopViewProps {}

export function DesktopView({}: DesktopViewProps) {
    const [showPresentation, setShowPresentation] = useState<boolean>(!hasAcceptedTerms());
    const [currentTasks, setCurrentTasks] = useState<Task[]>(getTodaysTasks());
    const [currentListName, setCurrentListName] = useState<string | undefined>(TODAY);
    const [currentEditTask, setCurrentEditTask] = useState<Task | undefined>(undefined);
    const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);
    const [currentAgendaDate, setCurrentAgendaDate] = useState<Date | undefined>(undefined);

    return (
        <div>
            {showPresentation && <Presentation onOK={() => setShowPresentation(false)} />}
            {!showPresentation && (
                <div className="desktopView">
                    <Categories
                        onCreateTaskPressed={() => {
                            setIsCreatingTask(true);
                        }}
                        onCategoryPressed={(categoryName) => {
                            setCurrentListName(categoryName);
                            if (categoryName === TODAY) {
                                setCurrentTasks(getTodaysTasks());
                                setCurrentAgendaDate(new Date());
                            } else {
                                setCurrentTasks(loadListFromLocalStorage(categoryName).tasks);
                                setCurrentAgendaDate(undefined);
                            }
                        }}
                        onEditTaskRequested={(task: Task) => {
                            setCurrentEditTask(task);
                        }}
                        onCategoryRemoved={(categoryName: string) => {
                            if (categoryName === currentListName) {
                                setCurrentListName(undefined);
                                setCurrentTasks([]);
                            }
                        }}
                        onCategoryClearCompleted={(categoryName: string) => {
                            if (categoryName === currentListName) {
                                const tasks = loadListFromLocalStorage(categoryName).tasks;
                                setCurrentTasks(tasks);
                            }
                        }}
                        shouldHideNewTaskButton={true}
                    />
                    {currentListName && (
                        <ListView
                            listName={currentListName}
                            givenTasks={currentTasks}
                            onCreateTaskPressed={() => setIsCreatingTask(true)}
                            onRequireTaskEdit={(task: Task) => {
                                setCurrentEditTask(task);
                                setIsCreatingTask(true);
                            }}
                            onDeleteTask={(tasks: Task[]) => {
                                setCurrentTasks(tasks);

                                toast.success("Task deleted!");
                            }}
                        />
                    )}
                    {(isCreatingTask || currentEditTask) && (
                        <CreateTask
                            onCreateTask={(newTask: Task, listName: string) => {
                                setCurrentListName(listName);
                                setCurrentTasks(loadListFromLocalStorage(listName).tasks);
                                setIsCreatingTask(false);

                                toast.success("Task created!");
                            }}
                            onEditTask={(oldTask: Task, newTask: Task, listName: string) => {
                                setCurrentListName(listName);
                                setCurrentTasks(loadListFromLocalStorage(listName).tasks);
                                setIsCreatingTask(false);
                                setCurrentEditTask(undefined);

                                toast.success("Task edited!");
                            }}
                            onCancelCreation={() => {
                                setIsCreatingTask(false);
                                setCurrentEditTask(undefined);
                            }}
                            shouldHideBackButton={true}
                            defaultListName={currentListName}
                            taskToEdit={currentEditTask}
                            defaultDate={currentAgendaDate}
                        />
                    )}
                    {currentListName && !isCreatingTask && !currentEditTask && (
                        <AgendaView
                            onDateChange={(date) => {
                                setCurrentTasks(
                                    getDayTask(
                                        date,
                                        loadTodosFromLocalStorage().flatMap((cat) => cat.tasks)
                                    )
                                );
                                setCurrentListName(
                                    date.toDateString() === new Date().toDateString()
                                        ? TODAY
                                        : date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })
                                );
                                setCurrentAgendaDate(date);
                            }}
                        />
                    )}
                    {!currentListName && !isCreatingTask && !currentEditTask && <IdleDesktopPanel />}
                </div>
            )}
        </div>
    );
}
