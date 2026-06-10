
## 1. `axios.ts`

Это не просто "настроенный axios". Это **security boundary** между браузером и Laravel.

Он решает 4 проблемы одновременно:

---

**Единая точка входа**

Весь проект делает запросы только через `api`. Никакого `fetch()` вразброс, никаких отдельных axios instances в разных фичах. Если завтра нужно добавить заголовок или поменять baseURL — меняешь в одном месте.

---

**`withCredentials: true` — без этого Sanctum не работает**

Браузер по умолчанию не отправляет куки на другой домен. `yourshop.com` → `api.yourshop.com` — это cross-origin. Без этого флага session cookie не летит, Laravel видит анонимного пользователя на каждом запросе.

---

**CSRF protection — двухуровневая**

Первый уровень — request interceptor делает prefetch куки **до** мутации. Laravel ставит `XSRF-TOKEN` куку, браузер сам читает её и добавляет `X-XSRF-TOKEN` заголовок к следующему запросу. Ты не трогаешь куку руками — это нативное поведение axios.

Второй уровень — если кука всё же устарела (пользователь оставил вкладку на ночь), response interceptor ловит 419 и делает retry. С дедупликацией — если 5 запросов упали одновременно, за кукой идёт один промис, остальные ждут его.

---

**401 — осознанное решение не редиректить здесь**

Интерсептор только пробрасывает ошибку наверх. Редирект делает `useMeQuery` на уровне компонента. Потому что интерсептор не должен знать о роутинге — это нарушило бы разделение ответственности.

---

## Одна фраза для интервью

> "axios.ts — это security layer. Он обеспечивает cross-origin передачу session cookie, автоматически управляет CSRF токеном Sanctum включая retry при истечении, и централизует обработку auth ошибок не смешивая транспортный слой с роутингом приложения."

---

[LoginForm.tsx] 
       │  (отправляет email/password)
       ▼
[useLoginMutation.ts] ──▶ Вызывает sessionApi.login({email, password})
       │
       ▼
[session.api.ts] ───────▶ Дергает axios.post('/v1/auth/login')
       │
       ▼
[shared/api/axios.ts] ──▶ [Interceptor] Проверяет куку XSRF-TOKEN. 
                          Если её нет — сначала делает GET на /sanctum/csrf-cookie,
                          а уже потом шлет POST на /login с куками.
       │
       ▼
[public/index.php] ───────▶ Инициализация контейнера (Service Container) и HTTP-ядра
       │
       ▼
[Http/Kernel.php] ────────▶ Прогон через стек мидлварей (Sanctum Stateful Middleware)
       │                   ├── 1. EnsureFrontendRequestsAreStateful (Распознает твой Next.js)
       │                   ├── 2. EncryptCookies & StartSession (Поднимает сессию из Redis/файлов)
       │                   └── 3. VerifyCsrfToken (Сверяет X-XSRF-TOKEN из заголовка Axios)
       │
       ▼
[routes/api.php] ─────────▶ Матчинг роута -> Route::post('/v1/auth/login', [AuthController::class, 'login'])
       │
       ▼
[LoginRequest.php] ───────▶ Слой Валидации (FormRequest)
       │                   ├── Провал -> 422 Unprocessable Entity (Axios ловит в onError)
       │                   └── Успех  -> Данные идут дальше в контроллер
       │
       ▼
[AuthController.php] ─────▶ Метод login(LoginRequest $request)
       │                   └── Упаковка данных: LoginDTO::fromRequest($request)
       │
       ▼
[LoginService.php] ───────▶ Бизнес-логика авторизации
       │                   ├── Вызов фасада Auth::attempt($dto->toArray())
       │                   └── Генерация сессионной куки (laravel_session) сервером
       │
       ▼
[HTTP Response 200/204] ──▶ Laravel отправляет пустой успешный ответ + Set-Cookie заголовки
       │
       ▼  (Next.js получает успех и тут же шлет второй запрос: GET /v1/auth/me)
       │
[EnsureFrontendRequestsAreStateful] -> Снова магия Sanctum (привязывает запрос к сессии юзера)
       │
       ▼
[auth:sanctum Middleware] ─▶ Мидлварь защиты эндпоинта (проверяет, авторизован ли ты)
       │
       ▼
[AuthController@me] ──────▶ Метод me() возвращает: new UserResource(auth()->user())
       │
       ▼
[UserResource.php] ───────▶ Слой трансформации (Вырезает лишнее, оставляет то, что ждет TS тип User)
       │
       ▼  (Возвращает 200 OK)
[useLoginMutation] ─────▶ onSuccess() 
                          ├── 1. fetchQuery(['auth', 'me']) -> Laravel отдает профиль
                          ├── 2. setAuth(user) -> Пишем данные в Zustand [auth.store.ts]
                          └── 3. router.push('/') -> Редирект на главную