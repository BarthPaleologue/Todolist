import React, { useState } from "react";
import fs from "fs";
import categories from "../indexes/categories.json";
import { Task, TaskList } from "../task";
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from "../utils/localStorage";

const local_categories: TaskList[] = categories.map((cat) => ({
    title: cat.title,
    tasks: cat.tasks.map((task) => ({
        title: task.title,
        details: task.details,
        isComplete: task.isComplete,
        date: task.date ? new Date(task.date) : undefined,
        location: task.location ? task.location : undefined,
        sharedWith: task.sharedWith ? task.sharedWith : undefined
    }))
}));

saveTodosToLocalStorage(local_categories);

console.log(localStorage);
const lst_categories: TaskList[] = loadTodosFromLocalStorage();

const Categories = () => {
    // Render all categories
    const newArr = lst_categories.map((cat) => {
        return (
            <div key={cat.title} className="category-item">
                {" "}
                {cat.title}
            </div>
        );
    });

    // SearchBar
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    // if (searchInput.length > 0) {
    //     lst_tasks.filter((task) => {
    //         return task.title.match(searchInput);
    //     });
    // }

    return (
        <div className="category">
            <div className="category-header"> Tasks </div>
            <input type="search" placeholder="Search here" onChange={handleChange} value={searchInput} />
            <div className="today"> Today </div>
            <div className="category-list">{newArr}</div>
        </div>
    );
};

export default Categories;
