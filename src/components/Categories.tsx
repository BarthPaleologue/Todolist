import React, { useState, useRef } from "react";
import fs from "fs";
import categories from "../indexes/categories.json";
import { Task, TaskList } from "../task";
import { TODO_KEY, loadTodosFromLocalStorage, saveTodosToLocalStorage, saveTaskListToLocalStorage } from "../utils/localStorage";

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
let lst_tasks: Task[] = [];

interface CategoriesProps {
    onCreateTaskPressed: () => void;
    onCategoryPressed: (category: string) => void;
}

const Categories = ({ onCreateTaskPressed, onCategoryPressed }: CategoriesProps) => {
    // Callback called when typing on the search bar
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(dynamicSearch(e.target.value));
    };

    // Function to search all tasks that contain searchInput
    const dynamicSearch = (searchInput: string) => lst_tasks.filter((task) => task.title.toLowerCase().includes(searchInput));

    // Variables of the input field for a new category
    const inputRef = useRef<HTMLInputElement>(null);

    // Add a category to the local Storage
    function addCategory(name: string) {
        console.log("Adding category", name);
        const newCategory: TaskList = {
            title: name,
            tasks: []
        };
        let lst_cat = document.getElementById("category-list") as HTMLInputElement;
        const newDivCat = document.createElement("div");
        newDivCat.className = "category-item";
        newDivCat.innerText = name;
        lst_cat.appendChild(newDivCat);
        saveTaskListToLocalStorage(newCategory);
    }

    // Make visible the input field to add a new category
    function createCategory() {
        (document.getElementById("new-category") as HTMLInputElement).hidden = false;
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    // Handle 'Enter' key pressed when entering a new category
    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            let name = (document.getElementById("new-category") as HTMLInputElement).value.trim();
            if (name.length > 0) {
                addCategory(name);
            }
            (document.getElementById("new-category") as HTMLInputElement).value = "";
            (document.getElementById("new-category") as HTMLInputElement).hidden = true;
        }
    }

    // Load all tasks when the searchBar is focused
    function loadAllTasks() {
        console.log("Loading all tasks");
        lst_tasks = [];
        lst_categories.map((cat) => cat.tasks.map((elem) => lst_tasks.push(elem)));
        console.log(lst_tasks);
    }

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
            <header>
                <h1>Tasks</h1>
            </header>
            <input type="search" placeholder="Search here" onChange={handleChange} onFocus={loadAllTasks} />
            <div className="category-item">
                Today  
                <span className="category-length"> 1 </span>
            </div>
            <div id="category-list">{newArr}</div>

            <div className="buttonBlock">
                <button onClick={onCreateTaskPressed}>New Task</button>
            </div>
        </div>
    );
};

export default Categories;
