import { useState } from "react";
import { Task, TaskList } from "../task";
import { loadListFromLocalStorage, saveTaskListToLocalStorage } from "../utils/localStorage";
import { Header } from "./Header";
import { TodoItem } from "./TodoItem";

interface ListViewProps {
    listName: string;
    onCreateTaskPressed: () => void;
    onBackPressed: () => void;
    onRequireTaskEdit: (task: Task) => void;
}

export function ListView({ listName, onCreateTaskPressed, onBackPressed, onRequireTaskEdit }: ListViewProps) {
    const [tasks, setTasks] = useState<Task[]>(loadListFromLocalStorage(listName));

    return (
        <div className="verticalView">
            <Header title={listName} onBackPressed={onBackPressed} />
            <ul className="listContainer">
                {tasks.map((task: Task, index: number) => (
                    <TodoItem
                        key={index}
                        onCompleteChange={() => {
                            saveTaskListToLocalStorage({ title: listName, tasks: tasks });
                        }}
                        onEdit={(task: Task) => {
                            onRequireTaskEdit(task);
                        }}
                        onDelete={(list: TaskList) => setTasks(list.tasks)}
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
