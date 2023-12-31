import DatePicker from "react-datepicker";
import { Task, TaskList } from "../task";
import "react-datepicker/dist/react-datepicker.css";
import { loadCategoriesNamesFromLocalStorage, loadTodosFromLocalStorage, saveTaskListToLocalStorage, saveTodosToLocalStorage } from "../utils/localStorage";
import { useState } from "react";
import { Header } from "./Header";
import { getCategory, getIndexOfTaskInList } from "../utils/taskFinding";
import { TODAY } from "./Categories";

interface CreateTaskProps {
    onCreateTask: (task: Task, listName: string) => void;
    onEditTask: (oldTask: Task, newTask: Task, listName: string) => void;
    onCancelCreation: () => void;
    defaultListName?: string;
    defaultDate?: Date;
    taskToEdit?: Task;
    shouldHideBackButton?: boolean;
}

export const DEFAULT_LISTNAME = "Other";

export const NEW_LISTNAME = "New List";

export function CreateTask({ onCreateTask, onEditTask, onCancelCreation, defaultListName, defaultDate, taskToEdit, shouldHideBackButton }: CreateTaskProps) {
    let [newTaskTitle, setNewTaskTitle] = useState<string>(taskToEdit?.title ?? "");

    let [newTaskDescription, setNewTaskDescription] = useState<string>(taskToEdit?.details ?? "");

    let [startDate, setStartDate] = useState<Date | undefined>(taskToEdit?.date ?? defaultDate ?? undefined);

    let [location, setLocation] = useState<string | undefined>(taskToEdit?.location ?? undefined);

    const listNames = loadCategoriesNamesFromLocalStorage();

    let [listName, setListName] = useState<string>(listNames.includes(defaultListName ?? NEW_LISTNAME) ? defaultListName ?? NEW_LISTNAME : NEW_LISTNAME);

    let [newListName, setNewListName] = useState<string | undefined>(undefined);

    let [urgency, setUrgency] = useState<number>(taskToEdit?.urgency ?? 0);

    function handleEditTask() {
        if (taskToEdit === undefined) throw new Error("Task to edit is undefined");

        const todos = loadTodosFromLocalStorage();

        let listTitle = listName;
        if (listName === TODAY) {
            const catNames = loadCategoriesNamesFromLocalStorage();
            listTitle = catNames.length > 0 ? catNames[0] : DEFAULT_LISTNAME;
        }

        const oldTaskList = getCategory(taskToEdit, todos);
        if (oldTaskList.title !== (newListName ?? listTitle)) {
            oldTaskList.tasks.splice(getIndexOfTaskInList(taskToEdit, oldTaskList), 1);
            saveTaskListToLocalStorage(oldTaskList);
        }

        const list = todos.find((list) => list.title === (newListName ?? listTitle));
        const newTask: Task = {
            title: newTaskTitle,
            details: newTaskDescription,
            date: startDate,
            isComplete: false,
            location: location,
            sharedWith: undefined,
            urgency: urgency
        };

        if (list === undefined) {
            // throw new Error("List is undefined");
            saveTaskListToLocalStorage({ title: newListName ?? listName, tasks: [newTask] });
        } else {
            const idx = getIndexOfTaskInList(taskToEdit, list);
            if (idx > -1) {
                list.tasks.splice(idx, 1);
            }
            list.tasks.push(newTask);
            saveTaskListToLocalStorage(list);
        }

        onEditTask(taskToEdit, newTask, newListName ?? listName);
    }

    function handleCreateTask() {
        const task: Task = {
            title: newTaskTitle,
            details: newTaskDescription,
            date: startDate,
            isComplete: false,
            location: undefined,
            sharedWith: undefined,
            urgency: urgency
        };

        const todoList = loadTodosFromLocalStorage();

        let listTitle = listName;
        if (listName === TODAY) {
            const catNames = loadCategoriesNamesFromLocalStorage();
            listTitle = catNames.length > 0 ? catNames[0] : DEFAULT_LISTNAME;
        }

        const list = todoList.find((list) => list.title === (newListName ?? listTitle));
        if (list === undefined) {
            todoList.push({
                title: newListName ?? listTitle,
                tasks: [task]
            });
        } else {
            list.tasks.push(task);
        }

        saveTodosToLocalStorage(todoList);

        onCreateTask(task, newListName ?? listName);
    }

    return (
        <div className="verticalView">
            <Header title="Create Task" onBackPressed={onCancelCreation} shouldHideBackButton={shouldHideBackButton} />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (taskToEdit !== undefined) handleEditTask();
                    else handleCreateTask();
                }}
            >
                <section className="mainContainer">
                    <label htmlFor="title" aria-required>
                        Task title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Meet with John"
                        value={newTaskTitle}
                        onChange={(e) => {
                            setNewTaskTitle(e.target.value);
                        }}
                        required
                        autoFocus
                    />

                    <label htmlFor="description">Task description:</label>
                    <textarea
                        placeholder="Discuss the new project"
                        id="description"
                        value={newTaskDescription}
                        onChange={(e) => {
                            setNewTaskDescription(e.target.value);
                        }}
                    />

                    <label htmlFor="listName" aria-required>
                        List name:
                    </label>
                    <select
                        value={loadCategoriesNamesFromLocalStorage().length === 0 || listName === "Today" ? "New List" : listName}
                        id="listName"
                        onChange={(e) => {
                            setListName(e.target.value);
                        }}
                        required
                    >
                        {listName !== NEW_LISTNAME && listName !== TODAY && <option value={listName}>{listName}</option>}
                        {loadCategoriesNamesFromLocalStorage().map(
                            (categoryName) =>
                                categoryName !== listName && (
                                    <option key={categoryName} value={categoryName}>
                                        {categoryName}
                                    </option>
                                )
                        )}
                        <option value={NEW_LISTNAME}>{NEW_LISTNAME}</option>
                    </select>

                    {listName === NEW_LISTNAME && (
                        <label htmlFor="newListName" aria-required>
                            New list name:
                        </label>
                    )}
                    {listName === NEW_LISTNAME && (
                        <input
                            type="text"
                            placeholder="With John"
                            value={newListName}
                            onChange={(e) => {
                                setNewListName(e.target.value);
                            }}
                            required
                        />
                    )}

                    <label htmlFor="date">Date:</label>
                    <DatePicker
                        autoComplete="off"
                        placeholderText="Select a date"
                        id="date"
                        isClearable
                        value={startDate?.toDateString()}
                        onChange={(date) => {
                            if (date === null) throw new Error("Date is null");
                            setStartDate(date);
                        }}
                    />

                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        placeholder="Central Park"
                        defaultValue={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                    />

                    <label htmlFor="urgency">Priority: {urgency}</label>
                    <input
                        type="range"
                        id="urgency"
                        min="0"
                        max="5"
                        value={urgency}
                        onChange={(e) => {
                            setUrgency(parseInt(e.target.value));
                        }}
                    />
                </section>
                <div className="buttonBlock">
                    <button type="reset" onClick={onCancelCreation}>
                        Cancel
                    </button>
                    <button type="submit">Ok</button>
                </div>
            </form>
        </div>
    );
}
