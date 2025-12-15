// components/layout/Header/navbar/BurgerButton.tsx

type BurgerButtonProps = {
  open: boolean;
  onToggle: () => void;
};

export function BurgerButton({ open, onToggle }: BurgerButtonProps) {
    return (
        <button
        onClick={onToggle}
        aria-label={open ? "Close menu" : "Open menu"}
        className="
            relative flex h-10 w-10 items-center justify-center
            focus:outline-none gap-22 cursor-pointer
        "
        >
        <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
        </span>

        {/* Top line */}
        <span
            className={`
            absolute h-[1.5px] w-10 bg-current
            transition-all duration-2500 ease-out
            ${open ? "rotate-45" : "-translate-y-2"}
            `}
        />

        {/* Middle line */}
        <span
            className={`
            absolute h-[1.5px] w-10 bg-current
            transition-all duration-0 ease-out
            ${open ? "opacity-0" : "opacity-100"}
            `}
        />

        {/* Bottom line */}
        <span
            className={`
            absolute h-[1.5px] w-10 bg-current
            transition-all duration-2500 ease-out
            ${open ? "-rotate-45" : "translate-y-2"}
            `}
        />
        </button>
    );
}
