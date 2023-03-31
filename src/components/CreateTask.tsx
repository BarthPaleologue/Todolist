import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Task } from '../task';
import "react-datepicker/dist/react-datepicker.css";

export function CreateTask({ onCreateTask, onCancelCreation }: { onCreateTask: (task: Task, listName: string) => void, onCancelCreation: () => void; }) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const [startDate, setStartDate] = useState(new Date());

    const [listName, setListName] = useState('Pro');

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
        setNewTaskTitle('');
    }

    function handleCancelCreateTask() {
        onCancelCreation();
    }

    return (
        <div>
            <input
                type="text"
                placeholder="What todo?"
                value={newTaskTitle}
                onChange={handleChangeTitle}
            />

            <textarea
                placeholder="Description"
                value={newTaskDescription}
                onChange={handleChangeDescription}
            />

            <select
                value={listName}
                onChange={(event) => {
                    setListName(event.target.value);
                    console.log(event.target.value);
                }}
            >
                <option value="Pro">Pro</option>
                <option value="Perso">Perso</option>
            </select>

            <DatePicker selected={startDate} onChange={(date) => {
                if (date === null) throw new Error('Date is null');
                setStartDate(date);
            }} />

            <button onClick={handleCancelCreateTask}>Cancel</button>
            <button type="button" onClick={handleClickCreateTask}>
                Ok
            </button>
        </div>
    );
}