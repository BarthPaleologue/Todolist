import "./App.scss";

import { DesktopView } from "./components/DesktopView";
import { BrowserView, MobileView } from "react-device-detect";

import "react-toastify/dist/ReactToastify.css";
import { SmartphoneView } from "./components/SmartphoneView";
import { ToastContainer } from "react-toastify";

function App() {
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
