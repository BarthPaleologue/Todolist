import React from "react";
import ReactDOM from "react-dom/client";
import logo from "../assets/logo.png";
import { Header } from "./Header";

export function Presentation({ onOK }: { onOK: () => void }) {
    return (
        <div className="verticalView">
            <Header title="Welcome to Todos!" shouldHideBackButton={true} />
            <section className="mainContainer">
                <img className="logo" src={logo} />
                <ul className="listContainer presentation">
                    <li>Manage your tasks easily!</li>
                    <li>To get started, press "Let's go!" then press "New Task". It's that easy</li>
                    <li>You can edit a task by clicking on it.</li>
                </ul>
            </section>
            <div className="buttonBlock">
                <button onClick={onOK} style={{ width: "50px" }}>
                    Let's go!
                </button>
            </div>
        </div>
    );
}
