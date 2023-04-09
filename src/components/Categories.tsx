import React, { useState, useRef } from "react";
import { Task, TaskList } from "../task";
import { loadTodosFromLocalStorage, saveTaskListToLocalStorage } from "../utils/localStorage";
import { TodoItem } from "./TodoItem";
import { Header } from "./Header";
import { getCategory } from "../utils/taskFinding";

// Load localSotrage
interface CategoriesProps {
    onCreateTaskPressed: () => void;
    onCategoryPressed: (category: string) => void;
    onEditTaskRequested: (task: Task) => void;
}

const Categories = ({ onCreateTaskPressed, onCategoryPressed, onEditTaskRequested }: CategoriesProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [lst_categories, setLstCategories] = useState<TaskList[]>(loadTodosFromLocalStorage());

    const [lst_tasks, setListTask] = useState<Task[]>([]);

    const taskToDisplay = lst_tasks
        .filter((task) => task.title.toLowerCase().includes(searchQuery))
        .sort((taskA, taskB) => {
            return (taskB.urgency ?? 0) - (taskA.urgency ?? 0);
        });

    // Render all categories
    const newArr = lst_categories.map((cat) => {
        return (
            <div key={cat.title} className="category-item" onClick={() => onCategoryPressed(cat.title)}>
                {" "}
                {cat.title}
                <span className="category-length"> {cat.tasks.length} </span>
            </div>
        );
    });

    return (
        <div className="verticalView">
            <Header title="Tasks" shouldHideBackButton={true} />
            <input
                type="search"
                placeholder="Search here"
                onFocus={(e) => setListTask(lst_categories.flatMap((cat) => cat.tasks))}
                onChange={(e) => setSearchQuery(e.target.value.trim())}
            />
            <div className="category-display">
                {searchQuery.length == 0 && (
                    <div id="category-container">
                        <div className="category-item">
                            Today
                            <span className="category-length"> 1 </span>
                        </div>
                        <div id="category-list">{newArr}</div>
                    </div>
                )}
                {searchQuery.length > 0 && (
                    <ul className="listContainer">
                        {taskToDisplay.map((task: Task, index: number) => (
                            <TodoItem
                                key={index}
                                onCompleteChange={() => {
                                    let taskList = getCategory(task, lst_categories);
                                    saveTaskListToLocalStorage({ title: taskList?.title, tasks: taskList?.tasks });
                                }}
                                task={task}
                                onEdit={(task: Task) => onEditTaskRequested(task)}
                                onDelete={() => {
                                    setListTask(taskToDisplay.filter((t) => t !== task));
                                    setLstCategories(loadTodosFromLocalStorage());
                                }}
                            />
                        ))}
                    </ul>
                )}
            </div>
            <div className="buttonBlock">
                <button onClick={onCreateTaskPressed}>New Task</button>
            </div>
        </div>
    );
};

export default Categories;
