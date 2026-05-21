type MainProps = {
    className?: string;
};

export const Main = ({ className }: MainProps) => {
    return (
        <main>
            <div className={className}>Main</div>
        </main>
    );
};
