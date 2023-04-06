import React from "react";
import ReactDOM from "react-dom/client";
import logo from "../assets/logo.png";

export function Presentation({ onOK }: { onOK: () => void }) {
    return (
        <div className="verticalView">
            <header>
                <h1>How to use the App </h1>
            </header>
            <img src={logo} width="15%" />
            <ul>
                <li>Click on the "+" button at the button to add a category</li>
                <li>Click on a category to display its tasks</li>
                <li>Click on your photo to edit your profile</li>
                <li>Click on the "..." button to edit a category</li>
            </ul>
            <div className="buttonBlock">
                <button onClick={onOK} style={{ width: "50px" }}>
                    Accept
                </button>
            </div>
        </div>
    );
}
