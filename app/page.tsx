// *** Our e-commerce/components/pages/ will be here as our main pages in website which are called by layout.tsx as {children} ***

// IMPORTS start ⬇️
import { HomePage } from "@/components/pages/HomePage";
// IMPORTS end ⬆️

// EXPORTS start ⬇️
export default function Page() {
  return (
    <>
      <HomePage />
    </>
  );
}
// EXPORTS end ⬆️
