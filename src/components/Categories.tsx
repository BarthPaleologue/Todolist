import React, { useState, useRef } from "react";
import fs from "fs";
import categories from "../indexes/categories.json";
import { Task, TaskList } from "../task";
import { TODO_KEY, loadTodosFromLocalStorage, saveTodosToLocalStorage, saveTaskListToLocalStorage } from "../utils/localStorage";
import { TodoUnit } from "./TodoUnit";
import { Header } from "./Header";

// Load local data for testing
// const local_categories: TaskList[] = categories.map( (cat) => ({
//     title: cat.title,
//     tasks: cat.tasks.map( (task) =>  ({
//         title: task.title,
//         details: task.details,
//         isComplete: task.isComplete,
//         date: task.date ? new Date(task.date) : undefined,
//         location: task.location ? task.location : undefined,
//         sharedWith: task.sharedWith ? task.sharedWith : undefined,
//     }))
// }));
// saveTodosToLocalStorage(local_categories);
// console.log(localStorage[TODO_KEY]);

// Load localSotrage
const lst_categories: TaskList[] = loadTodosFromLocalStorage();

interface CategoriesProps {
    onCreateTaskPressed: () => void;
    onCategoryPressed: (category: string) => void;
    onEditTaskRequested: (task: Task) => void;
}

const Categories = ({ onCreateTaskPressed, onCategoryPressed, onEditTaskRequested }: CategoriesProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [lst_tasks, setListTask] = useState<Task[]>([]);

    const taskToDisplay = lst_tasks.filter((task) => task.title.toLowerCase().includes(searchQuery));

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
                            <TodoUnit
                                key={index}
                                onCompleteChange={() => {}}
                                task={task}
                                onEdit={(task: Task) => {
                                    onEditTaskRequested(task);
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
