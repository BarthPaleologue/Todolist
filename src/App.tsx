import "./App.scss";

import { DesktopView } from "./components/DesktopView";
import { BrowserView, MobileView } from "react-device-detect";

import "react-toastify/dist/ReactToastify.css";
import { SmartphoneView } from "./components/SmartphoneView";
import { ToastContainer } from "react-toastify";
import { loadTasksFromLocalStorage } from "./utils/localStorage";
import { scheduleNotification } from "./utils/notification";

function App() {
    // every hour, send notifications for tasks that are not done
    function dispatchNotifications() {
        const tasks = loadTasksFromLocalStorage();
        for (const task of tasks) {
            if (task.isComplete) continue;
            scheduleNotification(task);
        }
    }
    setInterval(() => {
        dispatchNotifications();
    }, 1000 * 60 * 60);

    dispatchNotifications();

    return (
        <div className="App">
            <BrowserView>
                <DesktopView />
            </BrowserView>
            <MobileView>
                <SmartphoneView />
            </MobileView>
            <ToastContainer autoClose={1000} hideProgressBar={true} position="top-center" />
        </div>
    );
}

export default App;
