import { useState } from "react";
import { Task, TaskList } from "../task";
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from "../utils/localStorage";
import { getIndexOfTaskInList, isTaskInList } from "../utils/taskFinding";

interface TodoUnitProps {
    task: Task;
    onCompleteChange: (task: Task) => void;
    onEdit: (task: Task) => void;
    onDelete: (list: TaskList) => void;
}

export function TodoUnit({ task, onCompleteChange, onEdit, onDelete }: TodoUnitProps) {
    const [isComplete, setIsComplete] = useState(task.isComplete);

    function handleChangeComplete() {
        setIsComplete(!isComplete);
        task.isComplete = !isComplete;
        onCompleteChange(task);
    }

    function handleDelete(task: Task) {
        const todos = loadTodosFromLocalStorage();
        const list = todos.find((list) => isTaskInList(task, list));
        if (list === undefined) throw new Error("List is undefined");
        list.tasks.splice(getIndexOfTaskInList(task, list), 1);

        saveTodosToLocalStorage(todos);

        onDelete(list);
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
                <div className="edit" onClick={() => onEdit(task)}></div>
                <div className="trash" onClick={() => handleDelete(task)}></div>
            </div>
        </li>
    );
}
