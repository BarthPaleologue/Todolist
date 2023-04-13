import { useState, useRef, useEffect } from "react";
import { Task, TaskList } from "../task";
import { loadTodosFromLocalStorage, saveTaskListToLocalStorage, removeTaskListFromStorage, clearCompletedTasksInCategory, renameCategory } from "../utils/localStorage";
import { TodoItem } from "./TodoItem";
import { Header } from "./Header";
import { getCategory, getDayTask } from "../utils/taskFinding";
import { toast } from "react-toastify";

// Load localSotrage
interface CategoriesProps {
    onCreateTaskPressed: () => void;
    onCategoryPressed: (category: string) => void;
    onEditTaskRequested: (task: Task) => void;
    onCategoryRemoved: (category: string) => void;
    onCategoryClearCompleted: (category: string) => void;
    shouldHideNewTaskButton?: boolean;
}

export const TODAY = "Today";

export const Categories = ({
    onCreateTaskPressed,
    onCategoryPressed,
    onEditTaskRequested,
    onCategoryRemoved,
    onCategoryClearCompleted,
    shouldHideNewTaskButton
}: CategoriesProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [lst_categories, setLstCategories] = useState<TaskList[]>(loadTodosFromLocalStorage());
    const [dropDown, setDropdown] = useState<number>(-1);
    const [lst_tasks, setListTask] = useState<Task[]>(lst_categories.flatMap((cat) => cat.tasks));
    const [renamedCategory, setRenamedCategory] = useState<string>("");
    let [newCategoryName, setNewCategoryName] = useState<string>("");

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

    function onRenameCategory(oldTitle: string) {
        if (newCategoryName.trim().length > 0) {
            renameCategory(oldTitle, newCategoryName);
            setLstCategories(loadTodosFromLocalStorage());
        }
        setRenamedCategory("");
        toast.success("Category renamed");
    }

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
        if (cat.title === renamedCategory) {
            return (
                <div key={cat.title} className="category-item">
                    <input
                        className="category-name"
                        type="text"
                        value={newCategoryName}
                        placeholder={cat.title}
                        onFocus={() => setNewCategoryName(cat.title)}
                        onChange={(e) => {
                            setNewCategoryName(e.target.value);
                        }}
                        onBlur={() => onRenameCategory(cat.title)}
                        onKeyDown={(e) => e.key === "Enter" && onRenameCategory(cat.title)}
                        autoFocus
                    />
                </div>
            );
        }
        return (
            <div key={cat.title} className="category-item">
                <p className="category-name" onClick={() => onCategoryPressed(cat.title)}>
                    {cat.title}
                </p>
                <p className="category-length"> {cat.tasks.length} </p>
                <div
                    className="more-icon"
                    onClick={() => {
                        setDropdown(idx);
                    }}
                ></div>
                <div className="category-options" ref={(el) => (clickRef.current[idx] = el)} onClick={() => (dropDown == idx ? setDropdown(-1) : setDropdown(idx))}>
                    {dropDown == idx ? (
                        <ul className="category-menu">
                            <li
                                className="menu-item"
                                onClick={() => {
                                    clearCompletedTasksInCategory(cat.title);
                                    setLstCategories(loadTodosFromLocalStorage());

                                    onCategoryClearCompleted(cat.title);

                                    toast.success("Cleared completed tasks");
                                }}
                            >
                                Remove cleared tasks{" "}
                            </li>
                            <li
                                className="menu-item"
                                onClick={() => {
                                    setRenamedCategory(cat.title);
                                }}
                            >
                                Rename{" "}
                            </li>
                            <li
                                className="menu-item"
                                onClick={() => {
                                    removeTaskListFromStorage(cat.title);
                                    setLstCategories(loadTodosFromLocalStorage());

                                    onCategoryRemoved(cat.title);

                                    toast.success("Category deleted");
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
                            <div className="category-item category-today" onClick={() => onCategoryPressed(TODAY)}>
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
            {!(shouldHideNewTaskButton ?? false) && (
                <div className="buttonBlock">
                    <button onClick={onCreateTaskPressed}>New Task</button>
                </div>
            )}
        </div>
    );
};

export default Categories;
