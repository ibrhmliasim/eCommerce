// IMPORT start
import { NavBar } from "./NavBar/NavBar";
// IMPORT end

// EXPORT start
    export function Header() {
        return (
            <header className="container mx-auto pt-6 px-5 md:px-8 lg:px-13">
                <NavBar />
            </header>
        );
    }
// EXPORT end