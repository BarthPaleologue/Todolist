import React, { useState, useRef, useEffect } from "react";
import { Task, TaskList } from "../task";
import { loadTodosFromLocalStorage, saveTaskListToLocalStorage, removeTaskListFromStorage, clearCompletedTasksInCategory, renameCategory } from "../utils/localStorage";
import { TodoItem } from "./TodoItem";
import { Header } from "./Header";
import { getCategory, getDayTask } from "../utils/taskFinding";

// Load localSotrage
interface CategoriesProps {
    onCreateTaskPressed: () => void;
    onCategoryPressed: (category: string) => void;
    onEditTaskRequested: (task: Task) => void;
}

export const TODAY = "Today";

export const Categories = ({ onCreateTaskPressed, onCategoryPressed, onEditTaskRequested }: CategoriesProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [lst_categories, setLstCategories] = useState<TaskList[]>(loadTodosFromLocalStorage());
    const [dropDown, setDropdown] = useState<number>(-1);
    const [lst_tasks, setListTask] = useState<Task[]>(lst_categories.flatMap((cat) => cat.tasks));

    const clickRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!clickRef.current.some((ref) => ref?.contains(e.target as Node))) {
                setDropdown(-1);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [clickRef]);

    const taskToDisplay = lst_tasks
        .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((taskA, taskB) => {
            if (taskA.isComplete && !taskB.isComplete) return 1;
            if (!taskA.isComplete && taskB.isComplete) return -1;
            return (taskB.urgency ?? 0) - (taskA.urgency ?? 0);
        });

    const taskToday = getDayTask(
        new Date(),
        lst_categories.flatMap((cat) => cat.tasks)
    );

    // Render all categories
    const newArr = lst_categories.map((cat: TaskList, idx: number) => {
        return (
            <div key={cat.title} className="category-item">
                <div className="category-name" onClick={() => onCategoryPressed(cat.title)}>
                    {" "}
                    {cat.title}
                    <span className="category-length"> {cat.tasks.length} </span>
                </div>
                <div className="category-options" ref={(el) => (clickRef.current[idx] = el)} onClick={() => (dropDown == idx ? setDropdown(-1) : setDropdown(idx))}>
                    {" "}
                    ...
                    {dropDown == idx ? (
                        <ul className="category-menu" onBlur={() => setDropdown(-1)}>
                            <li
                                className="menu-item"
                                onClick={() => {
                                    clearCompletedTasksInCategory(cat.title);
                                    setLstCategories(loadTodosFromLocalStorage());
                                }}
                            >
                                Remove cleared tasks{" "}
                            </li>
                            <li
                                className="menu-item"
                                onClick={() => {
                                    console.log("Rename Category");
                                }}>
                                Rename
                            </li>
                            <li
                                className="menu-item"
                                onClick={() => {
                                    removeTaskListFromStorage(cat.title);
                                    setLstCategories(loadTodosFromLocalStorage());
                                }}
                            >
                                Delete{" "}
                            </li>
                        </ul>
                    ) : null}
                </div>
            </div>
        );
    });

    return (
        <div className="verticalView">
            <Header title="Tasks" shouldHideBackButton={true} />
            <section className="mainContainer">
                <input
                    type="search"
                    placeholder="Search here"
                    onFocus={(e) => setListTask(lst_categories.flatMap((cat) => cat.tasks))}
                    onChange={(e) => setSearchQuery(e.target.value.trim())}
                />
                <div className="category-display">
                    {searchQuery.length == 0 && (
                        <div id="category-container">
                            <div className="category-item" onClick={() => onCategoryPressed(TODAY)}>
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
            </section>
            <div className="buttonBlock">
                <button onClick={onCreateTaskPressed}>New Task</button>
            </div>
        </div>
    );
};

export default Categories;
