import { useState } from "react";
import { Task } from "../task";

interface TodoUnitProps {
    task: Task;
    onCompleteChange: (task: Task) => void;
}

export function TodoUnit({ task, onCompleteChange }: TodoUnitProps) {
    const [isComplete, setIsComplete] = useState(task.isComplete);

    function handleChangeComplete() {
        setIsComplete(!isComplete);
        task.isComplete = !isComplete;
        onCompleteChange(task);
    }

    return (
        <li className={task.isComplete ? "finished" : ""} style={{ borderRadius: "20px" }}>
            <input type="checkbox" defaultChecked={task.isComplete} onChange={handleChangeComplete} />
            <label>{task.title}</label>
            {task.details && <sub style={{ color: "grey" }}>{task.details}</sub>}
            {task.date && <p>{task.date.toString()}</p>}
            {task.location && <p>At {task.location}</p>}
            {task.sharedWith && <p> Shared with {task.sharedWith.join(", ")}</p>}
        </li>
    );
}
