import DatePicker from "react-datepicker";
import { Task } from "../task";
import "react-datepicker/dist/react-datepicker.css";
import { loadCategoriesNamesFromLocalStorage } from "../utils/localStorage";
import { useState } from "react";

interface CreateTaskProps {
    onCreateTask: (task: Task, listName: string) => void;
    onCancelCreation: () => void;
    defaultListName?: string;
}

export function CreateTask({ onCreateTask, onCancelCreation, defaultListName }: CreateTaskProps) {
    let [newTaskTitle, setNewTaskTitle] = useState<string>("");

    let [newTaskDescription, setNewTaskDescription] = useState<string>("");

    let [startDate, setStartDate] = useState<Date | undefined>(undefined);

    let [location, setLocation] = useState<string | undefined>(undefined);

    let [listName, setListName] = useState<string>(defaultListName ?? "New List");

    let [newListName, setNewListName] = useState<string | undefined>(undefined);

    function handleClickCreateTask() {
        const task: Task = {
            title: newTaskTitle,
            details: newTaskDescription,
            date: startDate,
            isComplete: false,
            location: undefined,
            sharedWith: undefined
        };
        console.log(task, newListName ?? listName);
        onCreateTask(task, newListName ?? listName);
    }

    function handleCancelCreateTask() {
        onCancelCreation();
    }

    return (
        <div className="verticalView">
            <header>
                <h1>Create Task</h1>
            </header>
            <input
                type="text"
                placeholder="What todo?"
                value={newTaskTitle}
                onChange={(e) => {
                    setNewTaskTitle(e.target.value);
                }}
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
                <button onClick={handleCancelCreateTask}>Cancel</button>
                <button type="button" onClick={handleClickCreateTask}>
                    Ok
                </button>
            </div>
        </div>
    );
}
