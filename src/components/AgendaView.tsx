import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Header } from "./Header";

interface AgendaViewProps {
    onDateChange: (date: Date) => void;
}

export function AgendaView({ onDateChange }: AgendaViewProps) {
    return (
        <div className="verticalView">
            <Header title="Agenda" shouldHideBackButton={true} />

            <div className="mainContainer agendaContainer">
                <Calendar onChange={(value) => onDateChange(value as Date)} />
            </div>
        </div>
    );
}
