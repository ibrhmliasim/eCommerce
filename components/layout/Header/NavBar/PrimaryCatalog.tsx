import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { SecondaryCatalog } from "./SecondaryCatalog";
import { CatalogKey, CATALOG } from "./catalog.data";

const ITEMS = Object.keys(CATALOG) as CatalogKey[];


export function PrimaryCatalog() {
    const [active, setActive] = useState<CatalogKey | null>(null);
    const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
    const handlePrimaryClick = (item: CatalogKey) => {
        if (item === active) {
            setIsSecondaryOpen(false);
            setActive(null);
            return;
        }

        // Закрываем текущий secondary
        setIsSecondaryOpen(false);

        // После анимации — меняем категорию и открываем
        setTimeout(() => {
            setActive(item);
            setIsSecondaryOpen(true);
        }, 200); // должно совпадать с duration
    };

    return (
        <>
            {/* ================= MOBILE ================= */}
            <div className="md:hidden pt-10 px-6">
                <div className="relative overflow-x-auto">
                <Swiper slidesPerView="auto" spaceBetween={20}>
                {ITEMS.map((item) => (
                    <SwiperSlide key={item} style={{ width: "auto" }}>
                    <button
                        onClick={() => handlePrimaryClick(item)}
                        className={`
                        text-sm font-light tracking-wide whitespace-nowrap
                        transition-opacity cursor-pointer pb-6
                        ${
                            active === item
                            ? "font-medium"
                            : "font-light opacity-60 hover:opacity-90"
                        }
                        `}
                    >
                        {item}
                    </button>
                    </SwiperSlide>
                ))}
                </Swiper>
                </div>

                <SecondaryCatalog
                items={active ? CATALOG[active] : []}
                isOpen={isSecondaryOpen}
                />
            </div>

            {/* ================= DESKTOP / TABLET ================= */}
            <div className="hidden md:grid grid-cols-[240px_1fr] gap-6 pt-4">
                {/* Primary */}
                <nav className="flex flex-col">
                    {ITEMS.map((item) => (
                    <button
                        key={item}
                        onClick={() => handlePrimaryClick(item)}
                        className={`
                        text-lg font-light tracking-wide text-left
                        transition-opacity cursor-pointer pt-6
                        ${
                            active === item
                            ? "opacity-100"
                            : "opacity-60 hover:opacity-90"
                        }
                        `}
                    >
                        {item}
                    </button>
                    ))}
                </nav>

                {/* Secondary */}
                <div className="pt-4">
                    <SecondaryCatalog
                    items={active ? CATALOG[active] : []}
                    isOpen={isSecondaryOpen}
                    />
                </div>
            </div>
        </>
    );
}
