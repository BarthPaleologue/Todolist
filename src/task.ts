export interface Task {
    title: string;
    details: string | null;
    isComplete: boolean;
    date: Date | null;
    location: string | null;
    sharedWith: string[] | null;
}