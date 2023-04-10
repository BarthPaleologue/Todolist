export interface Task {
    title: string;
    details?: string;
    isComplete: boolean;
    date?: Date;
    location?: string;
    urgency?: number;
    sharedWith?: string[];
}

export interface TaskList {
    title: string;
    tasks: Task[];
}
