interface HeaderProps {
    title: string;
    shouldHideBackButton?: boolean;
    onBackPressed?: () => void;
}

export const Header = ({ title, shouldHideBackButton, onBackPressed }: HeaderProps) => {
    return (
        <header>
            {!shouldHideBackButton && (
                <div className="backButton" onClick={onBackPressed}>
                    <div className="backButtonIcon"> </div>
                </div>
            )}
            {shouldHideBackButton && <div className="backButton" />}
            <h1>{title}</h1>
        </header>
    );
};
