import Link from "next/link";

type NavItemProps = {
    href: string;
    label: string;
};

export function NavItem({ href, label }: NavItemProps) {
    return (
        <Link
            href={href}
            className="flex items-center md:text-xs text-foreground/80 hover:text-foreground transition-colors"
        >
            {label}
        </Link>
    );
}
