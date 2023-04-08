import { Task } from "../task";
import { loadListFromLocalStorage, saveTaskListToLocalStorage } from "../utils/localStorage";
import { Header } from "./Header";
import { TodoUnit } from "./TodoUnit";

interface ListViewProps {
    listName: string;
    onCreateTaskPressed: () => void;
    onBackPressed: () => void;
}

export function ListView({ listName, onCreateTaskPressed, onBackPressed }: ListViewProps) {
    const tasks = loadListFromLocalStorage(listName);
    console.log(tasks);

    return (
        <div className="verticalView">
            <Header title={listName} onBackPressed={onBackPressed} />
            <ul className="listContainer">
                {tasks.map((task: Task, index: number) => (
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
