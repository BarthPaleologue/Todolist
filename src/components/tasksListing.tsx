import React from 'react';
import {Task} from '../task';

function getTasks(): Task[] { // Hard-coded for now
    return [
        {
            title: 'Task 1',
            details: 'Task 1 description',
            isComplete: false,
            date: new Date('2021-01-01')
        },
        {
            title: 'Task 2',
            details: 'Task 2 description',
            isComplete: true,
            date: new Date('2021-01-03'),
            location: 'Paris',
            sharedWith: ['John']
        },
        {
            title: 'Task 3',
            details: 'Task 3 description',
            isComplete: false,
            date: new Date('2021-01-05'),
            location: 'London',
            sharedWith: ['John', 'Jane']
        }
    ];
}

export function displayTasks() {
    const tasks = getTasks();
    console.log(tasks);
    return (
        <div>
            {
                tasks.map((task: any, index: any) => (

                <div key={index} style={{borderRadius: '20px'}}>
            <h3>{task.title}</h3>
            {task.details && <p style={{color: 'grey'}}>{task.details}</p>}
            {task.date && <p>{task.date.toString()}</p>}
            <p>Completed? {("yes" && task.completed) || ("no" && !task.completed)}</p>
            {task.location && <p>At {task.location}</p>}
            {task.sharedWith && <p> Shared with {task.sharedWith.join(', ')}</p>}
        </div>
    ))}
</div>
)
    ;
}