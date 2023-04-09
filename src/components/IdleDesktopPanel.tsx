import { Header } from "./Header";

interface IdleDesktopPanelProps {}

export function IdleDesktopPanel({}: IdleDesktopPanelProps) {
    return (
        <div className="verticalView idleDesktopPanel">
            <Header title="" shouldHideBackButton={true} />
            <div className="idleDesktopPanelText">Select a category to get started</div>
        </div>
    );
}
