import { Task } from "../task";

const TODO_KEY = 'todo';

export function loadTodosFromLocalStorage(): Task[] {
    const todos = localStorage.getItem(TODO_KEY);
    if (todos === null) console.log('No todos found in local storage');
    return todos ? JSON.parse(todos) : [];
}

export function saveTodosToLocalStorage(todos: Task[]): void {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}