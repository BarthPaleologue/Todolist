import DatePicker from "react-datepicker";
import { Task } from "../task";
import "react-datepicker/dist/react-datepicker.css";
import { loadCategoriesNamesFromLocalStorage, loadTodosFromLocalStorage, saveTodosToLocalStorage } from "../utils/localStorage";
import { useState } from "react";
import { Header } from "./Header";
import { getIndexOfTaskInList } from "../utils/taskFinding";

interface CreateTaskProps {
    onCreateTask: (task: Task, listName: string) => void;
    onEditTask: (oldTask: Task, newTask: Task, listName: string) => void;
    onCancelCreation: () => void;
    defaultListName?: string;
    taskToEdit?: Task;
}

export function CreateTask({ onCreateTask, onEditTask, onCancelCreation, defaultListName, taskToEdit }: CreateTaskProps) {
    let [newTaskTitle, setNewTaskTitle] = useState<string>(taskToEdit?.title ?? "");

    let [newTaskDescription, setNewTaskDescription] = useState<string>(taskToEdit?.details ?? "");

    let [startDate, setStartDate] = useState<Date | undefined>(taskToEdit?.date ?? undefined);

    let [location, setLocation] = useState<string | undefined>(taskToEdit?.location ?? undefined);

    let [listName, setListName] = useState<string>(defaultListName ?? "New List");

    let [newListName, setNewListName] = useState<string | undefined>(undefined);

    let [urgency, setUrgency] = useState<number>(taskToEdit?.urgency ?? 0);

    function handleEditTask() {
        if (taskToEdit === undefined) throw new Error("Task to edit is undefined");

        const todos = loadTodosFromLocalStorage();
        const list = todos.find((list) => list.title === (newListName ?? listName));

        if (list === undefined) throw new Error("List is undefined");

        const newTask: Task = {
            title: newTaskTitle,
            details: newTaskDescription,
            date: startDate,
            isComplete: false,
            location: location,
            sharedWith: undefined,
            urgency: urgency
        };

        list.tasks.splice(getIndexOfTaskInList(taskToEdit, list), 1);
        list.tasks.push(newTask);

        saveTodosToLocalStorage(todos);

        onEditTask(taskToEdit, newTask, listName);
    }

    function handleCreateTask() {
        const task: Task = {
            title: newTaskTitle,
            details: newTaskDescription,
            date: startDate,
            isComplete: false,
            location: undefined,
            sharedWith: undefined
        };

        const todoList = loadTodosFromLocalStorage();

        const list = todoList.find((list) => list.title === (newListName ?? listName));
        if (list === undefined) {
            todoList.push({
                title: newListName ?? listName,
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
            <Header title="Create Task" onBackPressed={onCancelCreation} />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (taskToEdit !== undefined) handleEditTask();
                    else handleCreateTask();
                }}
            >
                <label htmlFor="title">Task title:</label>
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

                <label htmlFor="listName">List name:</label>
                <select
                    value={listName}
                    id="listName"
                    onChange={(e) => {
                        setListName(e.target.value);
                    }}
                    required
                >
                    {listName !== "New List" && <option value={listName}>{listName}</option>}
                    {loadCategoriesNamesFromLocalStorage().map((categoryName) => {
                        return (
                            <option key={categoryName} value={categoryName}>
                                {categoryName}
                            </option>
                        );
                    })}
                    <option value="New List">New List</option>
                </select>

                {listName === "New List" && (
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
                    placeholderText="Select a date"
                    id="date"
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

                <label htmlFor="urgency">Urgency: {urgency}</label>
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
