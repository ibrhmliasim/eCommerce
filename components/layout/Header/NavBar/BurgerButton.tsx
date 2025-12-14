// components/layout/Header/navbar/BurgerButton.tsx

type BurgerButtonProps = {
    onClick: () => void;
};

export function BurgerButton({ onClick }: BurgerButtonProps) {
    return (
        <button
            onClick={onClick}
            aria-label="Open menu"
            className="
                relative flex h-10 w-10 items-center justify-center
                rounded-md hover:bg-muted hover:border-none transition
                focus:outline-none focus:ring-2 focus:ring-ring
            "
        >
            <span className="sr-only">Open menu</span>

            <span className="absolute h-0.5 w-5 bg-current" />
            <span className="absolute h-0.5 w-5 bg-current translate-y-1.5" />
            <span className="absolute h-0.5 w-5 bg-current -translate-y-1.5" />
        </button>
    );
}
