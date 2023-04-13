import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Header } from "./Header";
import { useState } from "react";
import { loadTasksFromLocalStorage } from "../utils/localStorage";

interface AgendaViewProps {
    onDateChange: (date: Date) => void;
}

export function AgendaView({ onDateChange }: AgendaViewProps) {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const tasks = loadTasksFromLocalStorage();

    function isThereATaskOnDate(date: Date) {
        for (const task of tasks) {
            if (task.date === undefined) continue;
            if (task.date.getDate() === date.getDate() && task.date.getMonth() === date.getMonth() && task.date.getFullYear() === date.getFullYear()) return true;
        }
        return false;
    }

    return (
        <div className="verticalView">
            <Header title="Agenda" shouldHideBackButton={true} />

            <div className="mainContainer agendaContainer">
                <Calendar
                    tileClassName={({ activeStartDate, date, view }) => (view === "month" && isThereATaskOnDate(date) ? "busyDay" : null)}
                    locale="en-GB"
                    value={currentDate}
                    onChange={(value) => {
                        onDateChange(value as Date);
                        setCurrentDate(value as Date);
                    }}
                />
            </div>
        </div>
    );
}
