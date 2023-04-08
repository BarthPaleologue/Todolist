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
            sharedWith: undefined
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
                <input
                    type="text"
                    placeholder="What todo?"
                    value={newTaskTitle}
                    onChange={(e) => {
                        setNewTaskTitle(e.target.value);
                    }}
                    required
                />

                <textarea
                    placeholder="Description"
                    value={newTaskDescription}
                    onChange={(e) => {
                        setNewTaskDescription(e.target.value);
                    }}
                />

                <select
                    value={listName}
                    onChange={(e) => {
                        setListName(e.target.value);
                    }}
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
                        placeholder="New list name"
                        value={newListName}
                        onChange={(e) => {
                            setNewListName(e.target.value);
                        }}
                        required
                    />
                )}

                <DatePicker
                    placeholderText="Choose a date"
                    value={startDate?.toDateString()}
                    onChange={(date) => {
                        if (date === null) throw new Error("Date is null");
                        setStartDate(date);
                    }}
                />

                <input
                    type="text"
                    placeholder="Location"
                    defaultValue={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
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
