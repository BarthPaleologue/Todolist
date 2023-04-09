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
    const currentDate = new Date();

    const [lst_tasks, setListTask] = useState<Task[]>(lst_categories.flatMap((cat) => cat.tasks));

    const taskToDisplay = lst_tasks.filter((task) => task.title.toLowerCase().includes(searchQuery));
    const taskToday = lst_tasks.filter(
                    (task) => `${task.date?.getFullYear()}/${(task.date?.getMonth() ?? 0) +1}/${task.date?.getDate()}` == `${currentDate.getFullYear()}/${currentDate.getMonth() +1}/${currentDate.getDate()}`);

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
                            <span className="category-length"> {taskToday.length} </span>
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
