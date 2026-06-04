type SecondaryCatalogProps = {
    items: readonly string[];
    isOpen: boolean;
    onToggle?: () => void;
};

export function SecondaryCatalog({ items, isOpen, onToggle }: SecondaryCatalogProps) {
    return (
        <div
            className={`
            overflow-auto pb-22 transition-all duration-300 ease-out
            ${isOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"}
            `}
        >
            <div className="flex flex-col gap-4 pt-2">
            {items.map((item) => (
                <button
                key={item}
                onClick={onToggle}
                className="
                    text-sm font-light tracking-wide
                    opacity-70 hover:opacity-100
                    transition-transform hover:translate-x-1.5 ease-out duration-200
                    text-left cursor-pointer
                "
                >
                {item}
                </button>
            ))}
            </div>
        </div>
    );
}
