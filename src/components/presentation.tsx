import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from '../assets/logo.png'


export function Presentation()
{
    return (
        <div className = 'verticalView'>
            <h1>How to use the App </h1>
            <img src = {logo} />
            <li>Click on the "+" button at the button to add a category</li>
            <li>Click on a category to display its tasks</li>
            <li>Click on your photo to edit your profile</li>
            <li>Click on the "..." button to edit a category</li>
            
        </div>
    );
}