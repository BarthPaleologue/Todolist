import { Task } from "../task";
import { loadListFromLocalStorage, saveTaskListToLocalStorage } from "../utils/localStorage";
import { TodoUnit } from "./TodoUnit";

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
            <ul className="listContainer">
                {tasks.map((task: Task, index: any) => (
                    <TodoUnit
                        key={index}
                        onCompleteChange={() => {
                            saveTaskListToLocalStorage({ title: listName, tasks: tasks });
                        }}
                        task={task}
                    />
                ))}
            </ul>
            <div className="buttonBlock">
                <button onClick={onCreateTaskPressed}>New Task</button>
            </div>
        </div>
    );
}
