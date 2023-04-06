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
        <li className={task.isComplete ? "finished" : ""}>
            <input type="checkbox" defaultChecked={task.isComplete} onChange={handleChangeComplete} />
            <div className="taskTextContainer">
                <p className="taskTitle">{task.title}</p>
                {task.date && <p className="taskDate">{task.date.toDateString()}</p>}
                {task.details && (
                    <p className="taskDetails" style={{ color: "grey" }}>
                        {task.details}
                    </p>
                )}
                {task.location && <p className="taskLocation">At {task.location}</p>}
                {task.sharedWith && <p className="taskSharedWith"> Shared with {task.sharedWith.join(", ")}</p>}
            </div>
            <div className="editTrashBlock">
                <div className="edit"></div>
                <div className="trash"></div>
            </div>
        </li>
    );
}
