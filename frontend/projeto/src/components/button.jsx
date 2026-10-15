export default function Button({
    children,
    onClick
}) {
    return (
        <button
            type="button"
            className="primary-button"
            onClick={onClick}
        >
            <span>{children}</span>

            <span className="button-arrow">
                →
            </span>
        </button>
    );
}
