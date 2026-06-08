// *** Our e-commerce/components/pages/ will be here as our main pages in website which are called by layout.tsx as {children} ***

// IMPORTS start
import { AboutIntroSection } from "@/widgets/HomePage/AboutIntroSection";
// IMPORTS end 

// EXPORTS start
export default function Page() {
  return (
    <main className="container mx-auto py-10">
      {/* About Us / Intro */}
      <AboutIntroSection />
    </main>
  );
}
// EXPORTS end