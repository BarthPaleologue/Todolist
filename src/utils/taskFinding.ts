import { Task, TaskList } from "../task";

export function isTaskInList(task: Task, taskList: TaskList): boolean {
    return taskList.tasks.some((t) => t.title === task.title);
}

export function getIndexOfTaskInList(task: Task, taskList: TaskList): number {
    return taskList.tasks.findIndex((t) => t.title === task.title);
}

export function getCategory(task: Task, category: TaskList[]): TaskList {
    const result = category.find((taskList) => isTaskInList(task, taskList));
    if (result) {
        return result;
    }
    throw new Error("TaskList not found");
}

export function getDayTask(currentDate: Date, lst_tasks: Task[]): Task[] {
    return lst_tasks.filter(
        (task) =>
            `${task.date?.getFullYear()}/${(task.date?.getMonth() ?? 0) + 1}/${task.date?.getDate()}` ===
            `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`
    );
}
