import logo from '../assets/logo.png';
import { Task } from '../task';

const notificationOptions = {
    body: "It's happening today! Don't forget to do it!",
    icon: logo,
    vibrate: [200, 100, 200],
};

const taskNotified: Task[] = [];

export function requestNotificationPermission() {
    Notification.requestPermission();
}

export function hasTaskBeenNotified(task: Task) {
    let notified = false;
    taskNotified.forEach((notifiedTask) => {
        if (notifiedTask.title === task.title) notified = true;
    });
    return notified;
}

export function scheduleNotification(task: Task) {
    if (!task.date) return;
    if (Notification.permission !== 'granted') return requestNotificationPermission();

    // if the task is due today, send the notification
    if (task.date.toDateString() === new Date().toDateString()) {
        // if the task has already been notified, don't notify again
        if (hasTaskBeenNotified(task)) return;
        taskNotified.push(task);

        const notification = new Notification(task.title, notificationOptions);
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
        return;
    }
}