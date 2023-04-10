import { useState } from "react";
import { Task, TaskList } from "../task";
import { loadCategoriesNamesFromLocalStorage, loadTodosFromLocalStorage, saveTaskListToLocalStorage } from "../utils/localStorage";
import { Header } from "./Header";
import { TodoItem } from "./TodoItem";
import { TODAY } from "./Categories";
import { getCategory } from "../utils/taskFinding";

interface ListViewProps {
    listName: string;
    givenTasks: Task[];
    onCreateTaskPressed: () => void;
    onBackPressed?: () => void;
    onRequireTaskEdit: (task: Task) => void;
    onDeleteTask: (tasks: Task[]) => void;
}

export function ListView({ listName, givenTasks, onCreateTaskPressed, onBackPressed, onRequireTaskEdit, onDeleteTask }: ListViewProps) {
    return (
        <div className="verticalView">
            <Header title={listName} onBackPressed={onBackPressed} shouldHideBackButton={onBackPressed === undefined} />
            <ul className="listContainer mainContainer">
                {givenTasks
                    .sort((taskA, taskB) => {
                        if (taskA.isComplete && !taskB.isComplete) return 1;
                        if (!taskA.isComplete && taskB.isComplete) return -1;
                        return (taskB.urgency ?? 0) - (taskA.urgency ?? 0);
                    })
                    .map((task: Task, index: number) => (
                        <TodoItem
                            key={index}
                            onCompleteChange={() => {
                                if (listName === TODAY) {
                                    const taskList = getCategory(task, loadTodosFromLocalStorage());
                                    saveTaskListToLocalStorage({ title: taskList.title, tasks: givenTasks });
                                } else {
                                    saveTaskListToLocalStorage({ title: listName, tasks: givenTasks });
                                }
                            }}
                            onEdit={(task: Task) => {
                                onRequireTaskEdit(task);
                            }}
                            onDelete={(list: TaskList) => {
                                onDeleteTask(list.tasks);
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
