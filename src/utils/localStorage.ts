import { Task, TaskList } from "../task";

const TODO_KEY = 'todo_lists';

export function loadTodosFromLocalStorage(): TaskList[] {
    const todos = localStorage.getItem(TODO_KEY);
    if (todos === null) console.log('No todos found in local storage');
    return todos ? JSON.parse(todos) : [];
}

export function loadCategoriesNamesFromLocalStorage(): string[] {
    const todos = loadTodosFromLocalStorage();
    return todos.map((todo) => todo.title);
}

export function saveTodosToLocalStorage(todos: TaskList[]): void {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

export function saveTaskListToLocalStorage(taskList: TaskList): void {
    const todos = loadTodosFromLocalStorage();
    // find the index of the task list with the same title
    const index = todos.findIndex((todo) => todo.title === taskList.title);
    if (index === -1) { // if not found, add it to the end
        todos.push(taskList);
    } else { // if found, replace it
        todos[index] = taskList;
    }
}