import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Task } from "../task";
import "react-datepicker/dist/react-datepicker.css";
import { loadCategoriesNamesFromLocalStorage } from "../utils/localStorage";

export function CreateTask({
    onCreateTask,
    onCancelCreation,
    defaultListName
}: {
    onCreateTask: (task: Task, listName: string) => void;
    onCancelCreation: () => void;
    defaultListName?: string;
}) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const [startDate, setStartDate] = useState(new Date());

    const [location, setLocation] = useState("");

    const [listName, setListName] = useState(defaultListName ? defaultListName : "Pro");

    function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(event.target.value);
    }

    function handleChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setNewTaskDescription(event.target.value);
    }

    function handleClickCreateTask() {
        const task: Task = {
            title: newTaskTitle,
            details: newTaskDescription,
            date: startDate,
            isComplete: false,
            location: undefined,
            sharedWith: undefined
        };
        onCreateTask(task, listName);
        setNewTaskTitle("");
    }

    function handleCancelCreateTask() {
        onCancelCreation();
    }

    return (
        <div className="verticalView">
            <header>
                <h1>Create Task</h1>
            </header>
            <input type="text" placeholder="What todo?" value={newTaskTitle} onChange={handleChangeTitle} />

            <textarea placeholder="Description" value={newTaskDescription} onChange={handleChangeDescription} />

            <select
                value={listName}
                onChange={(e) => {
                    setListName(e.target.value);
                    console.log(e.target.value);
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
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setListName(e.currentTarget.value);
                    }}
                    onBlur={(e) => {
                        setListName(e.target.value);
                    }}
                />
            )}

            <DatePicker
                placeholderText="Choose a date"
                onChange={(date) => {
                    if (date === null) throw new Error("Date is null");
                    setStartDate(date);
                }}
            />

            <input
                type="text"
                placeholder="Location"
                onChange={(location) => {
                    setLocation(location.target.value);
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
