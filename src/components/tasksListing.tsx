import React from 'react';
import ReactDOM from 'react-dom/client';
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

function displayTasks() {
    const tasks = getTasks();
    return (
        <div>
            {
                tasks.map((task: any, index: any) => {
                    return (
                        <div key={index} style={{borderRadius: '20px'}}>
                            <input type={'checkbox'} checked={task.isComplete}/>
                            <h3>{task.title}</h3>
                            {task.details && <p style={{color: 'grey'}}>{task.details}</p>}
                            {task.date && <p>{task.date}</p>}
                            {task.location && <p>{task.location}</p>}
                            {task.sharedWith && <p>{task.sharedWith.join(', ')}</p>}
                        </div>
                    );
                })
            }
        </div>
    );
}