import { Header } from "./Header";

interface AgendaViewProps {}

export function AgendaView({}: AgendaViewProps) {
    return (
        <div className="verticalView">
            <Header title="Agenda" shouldHideBackButton={true} />
        </div>
    );
}
