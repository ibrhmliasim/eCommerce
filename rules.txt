# Import Rules — Plush Frontend

## Стандарт index.ts (единый для всего проекта)

**Правило 1: Внутри папки — прямые импорты**

Файлы в одной папке общаются напрямую, без index.ts:

```ts
// src/widgets/Header/NavBar/index.tsx
import { BurgerButton } from './BurgerButton'; // правильно
import { BurgerButton } from '@/widgets/Header/NavBar/BurgerButton'; // нарушение
```

**Правило 2: Снаружи — только через index.ts**

Любой импорт из другого слоя или из `app/` обращается только к папке:

```ts
// app/(shop)/page.tsx
import { HomePage } from '@/widgets/HomePage';      // правильно
import { HeroSliderSection } from '@/widgets/HomePage/HeroSliderSection'; // нарушение
```

**Правило 3: Импорты идут только вниз по слоям (FSD)**

```
app/ → widgets/ → features/ → entities/ → shared/
```

```ts
// features/auth/model/useMeQuery.ts
import { AuthUser } from '@/entities/user'; // правильно — вниз
import { Header } from '@/widgets/Header';  // нарушение — вверх
```

---

## Что экспортирует каждый слой

| Слой | index.ts экспортирует |
|---|---|
| `widgets/Header` | `<Header />` |
| `widgets/Header/NavBar` | `<NavBar />` |
| `widgets/HomePage` | `<HomePage />` |
| `features/auth` | `<LoginForm />`, `<RegisterForm />`, `useMeQuery` |
| `entities/user` | `AuthUser`, `UserRole` (только типы) |
| `shared/ui` | shadcn компоненты |
| `shared/api` | axios instance, queryClient |

Внутренности (`api/`, `model/`, отдельные компоненты) наружу не экспортируются.