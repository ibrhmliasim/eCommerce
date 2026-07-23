# Frontend Auth Module — Audit Decisions

> Covers: axios security layer, CSRF/Session lifecycle, Login/Register data flow
> Stack: Next.js 15, TypeScript, TanStack Query, Axios, Sanctum SPA (Stateful)

---

## ADR — Architectural Decision Records

### ADR-F1: `axios.ts` как security boundary, а не просто "настроенный axios"

**Контекст:**
Все запросы в проекте идут через единый `api` инстанс — никакого `fetch()` вразброс, никаких отдельных axios-инстансов в разных фичах. Это осознанное решение, а не просто стилистическое единообразие.

**Выбрали:**
`shared/api/axios.ts` — единственная точка входа для HTTP, решающая одновременно 4 задачи:

1. **Единая точка конфигурации.** Если завтра нужно поменять `baseURL` или добавить заголовок — меняешь в одном месте, а не ищешь по всем features.

2. **`withCredentials: true` — обязателен для Sanctum.** Браузер по умолчанию не шлёт куки на другой домен/порт. `localhost:3000` → `localhost:8000` — это cross-origin. Без этого флага session cookie не летит, и Laravel видит анонимного пользователя на каждом запросе, даже если пользователь только что залогинился.

3. **CSRF protection — двухуровневая защита.**
   - **Уровень 1 (request interceptor):** prefetch `/sanctum/csrf-cookie` **до** мутации, если валидной куки ещё нет.
   - **Уровень 2 (response interceptor):** если кука устарела (пользователь оставил вкладку на ночь) — ловим `419`, делаем повторный prefetch + retry. Обязательна дедупликация через singleton promise: если 5 запросов падают одновременно, за кукой идёт **один** промис, остальные ждут его результата, а не плодят параллельные запросы `/sanctum/csrf-cookie`.

4. **401 — осознанно НЕ редиректим внутри интерцептора.** Интерсептор пробрасывает ошибку наверх, редирект делает `useMeQuery` на уровне компонента/хука. Интерсептор не должен знать о роутинге приложения — это нарушило бы разделение ответственности (transport layer не должен решать navigation logic).

**Одна фраза для интервью:**
> "axios.ts — это security layer. Он обеспечивает cross-origin передачу session cookie, автоматически управляет CSRF-токеном Sanctum включая retry при истечении, и централизует обработку auth-ошибок, не смешивая транспортный слой с роутингом приложения."

---

### ADR-F2: Диагностика Cookie-Session & CSRF — трёхуровневая пирамида ошибок

**Контекст:**
При первичной настройке cross-domain авторизации (Next.js `localhost:3000` ↔ Laravel `localhost:8000`) ошибки проявляются строго послойно — каждый уровень блокирует доступ к следующему, пока не решён.

**Пирамида диагностики:**

```
┌─────────────────────────────────────────────────────────┐
│ LEVEL 3: 422 Unprocessable Entity (Бизнес-логика)        │ ◀── Конечная цель.
│                                                            │     Сеть и безопасность работают.
├─────────────────────────────────────────────────────────┤
│ LEVEL 2: 419 CSRF Token Mismatch / 404 (Безопасность)     │
├─────────────────────────────────────────────────────────┤
│ LEVEL 1: CORS Error (Безопасность браузера)               │
└─────────────────────────────────────────────────────────┘
```

**LEVEL 1 — CORS Error (`PreflightMissingAllowOriginHeader`)**

Браузер блокирует ответы Laravel, так как порты `3000`/`8000` разные origin.

Фикс (`config/cors.php` + `.env`):
```php
'allowed_origins' => ['http://localhost:3000'],
'supports_credentials' => true, // разрешает передачу cookie/сессий
```

**LEVEL 2 — 404 → 419 CSRF Token Mismatch**

Три отдельных бага, решённых одновременно:

1. **Неверный путь к `/sanctum/csrf-cookie`.** `config.apiUrl` содержит префикс `/api/v1`, из-за чего запрос улетал на `.../api/v1/sanctum/csrf-cookie` (404). Sanctum ждёт запрос в корне домена.

   Фикс + защита от race condition через singleton promise:
   ```typescript
   const appUrl = config.apiUrl.replace('/api/v1', '');

   let csrfCookieRequest: Promise<void> | null = null;

   const fetchCsrfCookie = (): Promise<void> => {
       if (!csrfCookieRequest) {
           csrfCookieRequest = axios
               .get(`${appUrl}/sanctum/csrf-cookie`, { withCredentials: true })
               .then(() => { csrfCookieRequest = null; })
               .catch((err) => { csrfCookieRequest = null; throw err; });
       }
       return csrfCookieRequest;
   };
   ```

2. **`withXSRFToken: true` — обязателен в Axios 1.6+ для cross-origin.** Раньше Axios автоматически читал куку `XSRF-TOKEN` и подставлял заголовок `X-XSRF-TOKEN` только для same-origin запросов. Для cross-origin нужен явный флаг:
   ```typescript
   axios.defaults.withXSRFToken = true;
   axios.defaults.withCredentials = true;
   ```

3. **Stateful-режим Laravel.** Маршруты авторизации должны попадать под `EnsureFrontendRequestsAreStateful`, чтобы Laravel инициализировал PHP-сессию и сверял заголовок `X-XSRF-TOKEN`.

**LEVEL 3 — 422 Unprocessable Entity (победа)**

Появление `422` вместо `419` — маркер, что вся цепочка (CORS → cross-domain cookies → CSRF header → сессия) отработала корректно. Laravel пустил запрос внутрь, дошёл до `FormRequest`, и вернул понятную ошибку бизнес-логики (например, неверный пароль).

**Одна фраза для интервью:**
> "Настраивал cross-domain cookie-авторизацию между Next.js и Laravel Sanctum. Прошёл классическую цепочку блокировок: CORS → 419 CSRF. CORS решил через `supports_credentials`. 419 победил комплексно: убрал лишний API-префикс в пути к `/sanctum/csrf-cookie`, обернул запрос в singleton promise против race condition, и включил `withXSRFToken: true` — обязательный флаг Axios 1.6+ для cross-origin отправки CSRF-заголовка. Появление 422 подтвердило, что вся security-инфраструктура работает корректно."

---

### ADR-F3: Разграничение сессионной куки и CSRF-токена — два независимых механизма

**Контекст:**
`XSRF-TOKEN` часто путают с токеном авторизации. Важно чётко разделять: под капотом Sanctum SPA работают **два независимых механизма одновременно**, отвечающих на разные вопросы.

**Механизм 1 — Личность («кто ты?») — `laravel_session`**

Обычная PHP-сессия. Бэкенд ставит куку `laravel_session` (зашифрованный session ID), браузер автоматически прикрепляет её к каждому запросу. Laravel находит сессию в хранилище (Redis) и определяет пользователя.

**Механизм 2 — Защита («безопасно ли?») — `XSRF-TOKEN`**

Анти-CSRF токен, не знающий ничего о личности пользователя — гость это или админ, ему всё равно. Единственная задача: доказать, что запрос пришёл с доверенного фронтенда, а не с фишингового сайта.

Поток:
1. `GET /sanctum/csrf-cookie` → Laravel ставит куку `XSRF-TOKEN`.
2. Axios (благодаря `withXSRFToken: true`) читает куку, копирует значение в заголовок `X-XSRF-TOKEN` следующего запроса.
3. Laravel сверяет куку `XSRF-TOKEN` и заголовок `X-XSRF-TOKEN` — совпадают → запрос легитимен. Не совпадают/заголовка нет → `419`.

**Итоговый lifecycle одного login-запроса:**

```
1. Request (Фронт → Бэк):
   - куки (включая XSRF-TOKEN)
   - заголовок X-XSRF-TOKEN (проверка безопасности)
   - email + password

2. Бэкенд проверяет:
   - Безопасность пройдена? (заголовок совпал)
   - Пароль верный?

3. Response (Бэк → Фронт):
   - Laravel генерирует сессию
   - Set-Cookie: laravel_session=...

4. Следующий запрос (например /me):
   - Браузер автоматически шлёт laravel_session
   - Laravel узнаёт пользователя → 200 OK + профиль
```

**Железобетонное резюме:**
* **`laravel_session`** — отвечает за **Аутентификацию** (кто ты).
* **`XSRF-TOKEN` + `X-XSRF-TOKEN`** — отвечают за **Безопасность** (откуда пришёл запрос).

---

### ADR-F4: Игнорирование тела ответа Login/Register — единственный источник правды через `useMeQuery`

**Контекст:**
`AuthController::login()` и `AuthController::register()` на бэке возвращают `UserResource` — идентичный тому, что отдаёт `AuthController::me()`. Технически фронтенд получает полные данные пользователя сразу в ответе на `/login` и `/register`, но намеренно их не использует: `sessionApi.login()` и `sessionApi.register()` типизированы как `Promise<void>`.

Вместо чтения тела ответа, `onSuccess` мутаций вызывает `queryClient.invalidateQueries()`, что триггерит отдельный `GET /me` — бэк повторно собирает и отправляет тот же `UserResource` вторым запросом.

**Выбрали:**
Осознанное дублирование одного HTTP-запроса ради единственного источника правды (single source of truth) для данных пользователя — только через `useMeQuery`. Это же решение стало причиной полного удаления Zustand `auth.store.ts` — хранение user data в двух местах (Zustand + Query cache) создавало dual source of truth.

**Почему (Архитектурные преимущества):**

1. **Устойчивость к повторным визитам.** Если у пользователя уже есть активная Sanctum-сессия (кука жива), но он открывает сайт заново — `login`/`register` не вызываются вообще за эту загрузку страницы. Единственный способ узнать «кто я» — спросить бэк через `/me`. Если бы данные писались в кэш только из `login`/`register`, при повторном визите кэш остался бы пустым, несмотря на валидную сессию.

2. **Консистентность между вкладками.** TanStack Query cache не шарится между вкладками браузера сам по себе. Вкладка Б не узнает, что вкладка А залогинилась, если у неё нет своего `useMeQuery`, спрашивающего бэк напрямую.

3. **Защита от гонки состояний.** Если бы данные писались в кэш из двух мест (`onSuccess` мутации и `useMeQuery`), при параллельных запросах или обновлении профиля возникает риск рассинхрона — непонятно, какая версия в кэше актуальна. Один источник записи устраняет проблему полностью.

4. **Простая инвалидация после изменений.** Обновление профиля или смена `role` в БД подхватывается через `invalidateQueries` без необходимости вручную прокидывать свежие данные из каждого места, которое теоретически могло бы их вернуть.

**Trade-off (Компромиссы):**
* Один лишний HTTP round-trip на каждый `login`/`register` (~20–100ms в типичных условиях).
* Бэкенд дважды выполняет сборку `UserResource` для одного логического события — не создаёт доп. нагрузки на БД (модель `User` уже в памяти из сессии), только повторную сериализацию.

**Когда пересматривать (Триггер для рефакторинга):**
При росте нагрузки, где экономия одного round-trip на login/register становится измеримо значимой, можно перейти на `queryClient.setQueryData()` прямо из тела ответа `login`/`register`, оставив `useMeQuery` как fallback для случаев без свежего login-события. На текущем масштабе проекта такая оптимизация преждевременна.

---

## Актуальный Data Flow (Login) — после рефакторинга Zustand

> Диаграмма ниже — исправленная версия черновика. Ключевые отличия от первой версии:
> `Zustand auth.store.ts` удалён полностью → единственный источник данных user — TanStack Query cache.
> `router.push('/')` заменён на `router.replace('/')` — предотвращает back-navigation в состояние до логина.

```
[LoginForm.tsx]
       │  (отправляет email/password)
       ▼
[useLoginMutation.ts] ──▶ Вызывает sessionApi.login({email, password})
       │
       ▼
[session.api.ts] ───────▶ Дёргает axios.post('/v1/auth/login')
       │
       ▼
[shared/api/axios.ts] ──▶ [Interceptor] Проверяет куку XSRF-TOKEN.
                          Если её нет — сначала GET /sanctum/csrf-cookie,
                          затем POST /login с куками.
       │
       ▼
[Http/Kernel.php] ────────▶ Стек мидлварей (Sanctum Stateful Middleware)
       │                   ├── 1. EnsureFrontendRequestsAreStateful
       │                   ├── 2. EncryptCookies & StartSession (сессия из Redis)
       │                   └── 3. VerifyCsrfToken (сверка X-XSRF-TOKEN)
       │
       ▼
[routes/api.php] ─────────▶ Route::post('/v1/auth/login', [AuthController::class, 'login'])
       │
       ▼
[LoginRequest.php] ───────▶ Валидация (FormRequest)
       │                   ├── Провал → 422 (Axios ловит в onError)
       │                   └── Успех  → дальше в контроллер
       │
       ▼
[AuthController.php] ─────▶ login(LoginRequest $request)
       │                   └── LoginDTO::fromRequest($request)
       │
       ▼
[AuthService.php] ────────▶ Auth::attempt(...) + session()->regenerate()
       │
       ▼
[HTTP Response 200] ──────▶ UserResource (тело ответа получено, но НЕ используется — см. ADR-F4)
       │                    + Set-Cookie: laravel_session
       │
       ▼  (onSuccess мутации не читает тело ответа, а инвалидирует кэш)
       │
[useLoginMutation onSuccess]
       │   ├── 1. queryClient.invalidateQueries(queryKeys.user.all)
       │   │        → триггерит useMeQuery → GET /v1/auth/me
       │   │        → UserResource собирается ЗАНОВО на бэке (ADR-F4)
       │   │        → данные пишутся в TanStack Query cache (единственное место записи)
       │   └── 2. router.replace('/') → редирект без возможности back-navigation в login
```

---

*Last updated: 2026-07-23*