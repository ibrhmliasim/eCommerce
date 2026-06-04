// widgets/layout/Header/index.ts
import { NavBar } from './NavBar';
// import { AdvertisingBanner } from './AdvertisingBanner'; // Расскомментируешь в будущем

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full flex flex-col bg-white border-b">
            {/* <AdvertisingBanner /> */}
            <NavBar />
        </header>
    );
}