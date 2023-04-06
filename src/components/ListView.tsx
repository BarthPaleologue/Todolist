import React from "react";
import { Task } from "../task";
import { loadListFromLocalStorage } from "../utils/localStorage";

interface ListViewProps {
    listName: string;
}

export function ListView({ listName }: ListViewProps) {
    const tasks = loadListFromLocalStorage(listName);
    console.log(tasks);
    return (
        <div>
            {tasks.map((task: any, index: any) => (
                <div key={index} style={{ borderRadius: "20px" }}>
                    <h3>{task.title}</h3>
                    {task.details && <p style={{ color: "grey" }}>{task.details}</p>}
                    {task.date && <p>{task.date.toString()}</p>}
                    <p>Completed? {("yes" && task.completed) || ("no" && !task.completed)}</p>
                    {task.location && <p>At {task.location}</p>}
                    {task.sharedWith && <p> Shared with {task.sharedWith.join(", ")}</p>}
                </div>
            ))}
        </div>
    );
}
