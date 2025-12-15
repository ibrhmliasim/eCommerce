import Link from "next/link";

type NavItemProps = {
    href: string;
    label: string;
};

export function NavItem({ href, label }: NavItemProps) {
    return (
        <Link
            href={href}
            className="flext items-center text-sm text-foreground"
        >
            {label}
        </Link>
    );
}
