import React from "react";
import { Task } from "../task";
import { loadListFromLocalStorage, saveTaskListToLocalStorage } from "../utils/localStorage";

interface ListViewProps {
    listName: string;
    onCreateTaskPressed: () => void;
}

export function ListView({ listName, onCreateTaskPressed }: ListViewProps) {
    const tasks = loadListFromLocalStorage(listName);
    console.log(tasks);
    return (
        <div className="verticalView">
            <header>
                <h1>{listName}</h1>
            </header>
            <section className="listContainer">
                {tasks.map((task: any, index: any) => (
                    <div key={index} className="listElement" style={{ borderRadius: "20px" }}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) => {
                                task.completed = e.target.checked;
                                saveTaskListToLocalStorage({ title: listName, tasks: tasks });
                            }}
                        />
                        <label>{task.title}</label>
                        {task.details && <sub style={{ color: "grey" }}>{task.details}</sub>}
                        {task.date && <p>{task.date.toString()}</p>}
                        {task.location && <p>At {task.location}</p>}
                        {task.sharedWith && <p> Shared with {task.sharedWith.join(", ")}</p>}
                    </div>
                ))}
            </section>
            <div className="buttonBlock">
                <button onClick={onCreateTaskPressed}>New Task</button>
            </div>
        </div>
    );
}
