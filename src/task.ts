export interface Task {
    title: string;
    details?: string;
    isComplete: boolean;
    date?: Date;
    location?: string;
    sharedWith?: string[];
}