// components/layout/Header/navbar/BurgerButton.tsx

type BurgerButtonProps = {
  open: boolean;
  onToggle: () => void;
};

// component starts from here. before this code other codes are not linked to component
export function BurgerButton({ open, onToggle }: BurgerButtonProps) {
    return (
        <button
        onClick={onToggle}
        aria-label={open ? "Close menu" : "Open menu"}
        className="
            relative flex h-5 w-10 md:min-w-24 md:min-h-24 items-center justify-center
            focus:outline-none cursor-pointer pointer-events-auto
        "
        >
        <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
        </span>

        {/* Top line */}
        <span
            className={`
            absolute h-[1.5px] w-10 md:w-20 bg-current
            transition-all duration-1000 ease-out
            ${open ? "rotate-45" : "-translate-y-2 md:-translate-y-5"}
            `}
        />

        {/* Middle line */}
        <span
            className={`
            absolute h-[1.5px] w-10 md:w-20 bg-current
            transition-all duration-0 ease-out
            ${open ? "opacity-0" : "opacity-100"}
            `}
        />

        {/* Bottom line */}
        <span
            className={`
            absolute h-[1.5px] w-10 md:w-20 bg-current
            transition-all duration-1000 ease-out
            ${open ? "-rotate-45" : "translate-y-2 md:translate-y-5"}
            `}
        />
        </button>
    );
}
