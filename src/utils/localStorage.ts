import { Task, TaskList } from "../task";

export const TODO_KEY = "todo_lists";

export function loadTodosFromLocalStorage(): TaskList[] {
    const todos = localStorage.getItem(TODO_KEY);
    if (todos === null) console.log("No todos found in local storage");
    const todosJSON = todos ? JSON.parse(todos) : [];

    // convert the dates back to Date objects
    for (const todo of todosJSON) {
        for (const task of todo.tasks) {
            if (task.date) task.date = new Date(task.date);
        }
    }

    return todosJSON;
}

export function loadCategoriesNamesFromLocalStorage(): string[] {
    const todos = loadTodosFromLocalStorage();
    return todos.map((todo) => todo.title);
}

export function loadListFromLocalStorage(title: string): TaskList {
    const todos = loadTodosFromLocalStorage();
    const todo = todos.find((todo) => todo.title === title);
    if (!todo) throw new Error("TaskList not found");
    return todo;
}

export function saveTodosToLocalStorage(todos: TaskList[]): void {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

export function saveTaskListToLocalStorage(taskList: TaskList): void {
    console.log(taskList.title);
    const todos = loadTodosFromLocalStorage();
    // find the index of the task list with the same title
    const index = todos.findIndex((todo) => todo.title === taskList.title);
    if (index === -1) {
        // if not found, add it to the end
        todos.push(taskList);
    } else {
        // if found, replace it
        todos[index] = taskList;
    }
    saveTodosToLocalStorage(todos);
}

export function emptyLocalStorage(): void {
    localStorage.removeItem(TODO_KEY);
}

export function removeTaskListFromStorage(title: string) {
    const todos = loadTodosFromLocalStorage();
    saveTodosToLocalStorage(todos.filter((todo) => todo.title !== title));
}

export function clearCompletedTasksInCategory(title: string) {
    const todos = loadTodosFromLocalStorage();
    const index = todos.findIndex((todo) => todo.title === title);
    if (index !== -1) {
        todos[index] = { title: todos[index].title, tasks: todos[index].tasks.filter((task) => !task.isComplete) };
    }
    saveTodosToLocalStorage(todos);
}

export function populateLocalStorage(): void {
    // populates local storage with some data for testing
    const todos = [
        {
            title: "Perso",
            tasks: [
                {
                    title: "Faire les courses",
                    details: "Task 1 description",
                    isComplete: false,
                    date: new Date("2021-01-01")
                },
                {
                    title: "Faire la vaisselle",
                    details: "Task 2 description",
                    isComplete: true,
                    date: new Date("2021-01-03"),
                    location: "Paris",
                    sharedWith: ["John"]
                },
                {
                    title: "Respirer",
                    details: "Task 3 description",
                    isComplete: false,
                    date: new Date("2021-01-05"),
                    location: "London",
                    sharedWith: ["John", "Jane"]
                }
            ]
        },
        {
            title: "Pro",
            tasks: [
                {
                    title: "Chercher un job",
                    details: "Task 4 description",
                    isComplete: false,
                    date: new Date("2021-01-01")
                },
                {
                    title: "Apprendre React",
                    details: "Task 5 description",
                    isComplete: true,
                    date: new Date("2021-01-03"),
                    location: "Paris",
                    sharedWith: ["John"]
                },
                {
                    title: "Organiser un meetup",
                    details: "Task 6 description",
                    isComplete: false,
                    date: new Date("2021-01-05"),
                    location: "London",
                    sharedWith: ["John", "Jane"]
                }
            ]
        }
    ];

    saveTodosToLocalStorage(todos);
}
