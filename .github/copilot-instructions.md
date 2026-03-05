# AI Coding Agent Instructions

## Project Overview

**Plush Wear** is a Next.js 16+ e-commerce application using TypeScript, React 19, Tailwind CSS, and Swiper for sliders. Architecture separates concerns into app routing, reusable components, and shared utilities.

## Architecture & Component Structure

### Three-Layer Component Organization

1. **App Layer** (`app/` - Next.js App Router)
   - Route definitions using file-based routing (e.g., `app/cart/page.tsx`)
   - Page components import from `components/pages/`
   - Each route wraps the main page component

2. **Pages Layer** (`components/pages/`)
   - Full-page components that map to routes (HomePage, CartPage, LoginPage, etc.)
   - Import sections from `components/pages/sections/`
   - Wrapped by layout in `app/layout.tsx`

3. **Components Layer** (`components/`)
   - **layout/** - Persistent UI across all pages (Header, Footer, NavBar)
   - **pages/sections/** - Reusable page sections (HeroSliderSection, FeaturedCategoriesSection, etc.)
   - **ui/** - Atomic UI elements (ProductGrid, etc.)

### Data Flow

- Static catalog data in `.data.ts` files (e.g., `catalog.data.ts` contains WOMAN/MAN product categories)
- State management via React hooks (`useState`, `useEffect`)
- Route params via Next.js router

## Code Patterns & Conventions

### Component Template Structure

Every component file follows this strict pattern:

```tsx
// "use client" directive (if component needs interactivity)
"use client";

// IMPORT start
import { ComponentName } from "@/path";
// IMPORT end

// EXPORT start
export function ComponentName(props: Props) {
  return <JSX />;
}
// EXPORT end
```

**Rules:**

- Mark components with `"use client"` **only if** they use hooks (useState, useEffect, onClick handlers)
- Always wrap imports and exports with `// IMPORT start/end` and `// EXPORT start/end` comments
- Use named exports exclusively

### Styling

- **Tailwind CSS** for all styling (v4 with @tailwindcss/postcss)
- **Responsive breakpoints**: `md:` (768px), `lg:` (1024px)
- Use `cn()` utility from `lib/utils.ts` to merge Tailwind classes conditionally
- Common padding: `px-5 md:px-8 lg:px-13`, `py-10`

### Props and TypeScript

- Define prop types with `type ComponentProps = { ... }`
- Use prop destructuring in component signature
- Keep types colocated with component file

### Naming Conventions

- **Components**: PascalCase (HomePage, NavBar, BurgerButton)
- **Files**: Match component name (NavBar.tsx, HomePage.tsx)
- **Data files**: `.data.ts` suffix (catalog.data.ts)
- **Directories**: lowercase (layout, pages, sections)

## Key Dependencies & Tools

### Build & Development

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Run ESLint (Next.js + TypeScript rules)
```

### UI Libraries

- **lucide-react** - Icons (Search, ShoppingBag, User, HelpCircle, etc.)
- **react-icons** - Alternative icon library
- **Swiper** - Carousel/slider component (HeroSliderSection, CampaignSliderSection)
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Smart Tailwind class merging

### Import Alias

- `@/` points to workspace root (`/Users/asimibrahimli/e-commerce/`)
- Always use `@/` for imports: `@/components/pages/HomePage` not relative paths

## Common Integration Patterns

### Navigation Links

```tsx
import Link from "next/link";
<Link href="/cart" className="...">
  Cart
</Link>;
```

### Image Optimization

```tsx
import Image from "next/image";
<Image src="/logo/logo1.svg" alt="PLUSH" width={320} height={80} priority />;
```

### Dynamic State Management

```tsx
const [open, setOpen] = useState(false);
return <Component open={open} onToggle={() => setOpen((v) => !v)} />;
```

## File Organization Rules

- **One component per file** (exception: small inline helpers)
- **Sections** contain reusable page parts (AboutIntroSection, FeaturedCategoriesSection)
- **Data files** (\*.data.ts) export constants like product categories, not components
- **Empty components** are stubs ready for implementation

## ESLint & Type Checking

- Config: `eslint.config.mjs` (Next.js core-web-vitals + TypeScript)
- TypeScript strict mode enabled in `tsconfig.json`
- Font variables configured in `layout.tsx` (Hanken_Grotesk family)

## Development Workflow

1. **Add new page**: Create route in `app/`, implement page component in `components/pages/`
2. **Add section**: Create file in `components/pages/sections/{featureName}/`, export as named export
3. **Add UI element**: Create in `components/ui/`, follow component template
4. **Modify navigation**: Update `catalog.data.ts` or `NavBar.tsx`
5. **Run lint before commit**: `npm run lint`

## Notes for AI Agents

- All text content in CATALOG (catalog.data.ts) is sample e-commerce category data
- Components are progressively enhanced (AboutIntroSection, CartPage currently stubs)
- Mobile-first responsive design: build for mobile, enhance with breakpoints
- State is local to components; no global state library currently in use
