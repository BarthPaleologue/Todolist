import React,  {useState} from 'react';
import fs from 'fs'
import categories from '../indexes/categories.json'
import { Task, TaskList } from '../task';
import {TODO_KEY, loadTodosFromLocalStorage, saveTodosToLocalStorage, saveTaskListToLocalStorage} from '../utils/localStorage';

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
console.log(localStorage[TODO_KEY]);


const lst_categories: TaskList[] = loadTodosFromLocalStorage();

const Categories = () => {
    // Render all categories 
    const newArr = lst_categories.map( (cat) => {
            return <div key={cat.title} className="category-item" > {cat.title}</div>;
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

    // Add Category function
    function addCategory(name: string){
        console.log("Adding category", name);
        const newCategory: TaskList = {
            title: name,
            tasks: []
        };
        let lst_cat = (document.getElementById('category-list') as HTMLInputElement);
        const newDivCat = document.createElement("div");
        newDivCat.className="category-item";
        newDivCat.innerText= name;
        lst_cat.appendChild(newDivCat);
        saveTaskListToLocalStorage(newCategory);
    }

    function createCategory(){
        (document.getElementById('new-category') as HTMLInputElement).hidden = false;
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.key === "Enter"){
            let name =  (document.getElementById('new-category') as HTMLInputElement).value.trim();
            if (name.length > 0){
                addCategory(name);
            } 
            (document.getElementById('new-category') as HTMLInputElement).value = '';
            (document.getElementById('new-category') as HTMLInputElement).hidden = true;
        }
    }


    return (
    <div className='category'>
        <div className='category-header'> Tasks </div>
        <input
            type="search"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput} />
        <div className='today'> Today </div>
        <div id='category-list'>
            {newArr}
        </div>
        <input id='new-category'  type="text" onKeyDown={handleKeyPress}/>
        <button className='addCatBtn' type="button" onClick={createCategory}> New List </button>
    </div>
    )
}


export default Categories;