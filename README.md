# Атлантика — сайт компании

Сайт компании «Атлантика» (Бийск, Алтайский край) — поставщика рыбы горячего и холодного копчения,
солёной и вяленой рыбы и снековой продукции. Сайт знакомит клиентов с ассортиментом и помогает
быстро связаться с менеджером для заказа.

## Возможности

- **Главная**: первый экран, категории ассортимента с количеством позиций, популярные позиции,
  «О нас», порядок заказа и контакты.
- **Каталог** (`/products`): поиск (без учёта регистра и «ё», по названию и категории),
  фильтр по категориям, состояние фильтров в URL (`?type=ХК&q=кета`), просмотр фото с листанием.
- **«Как заказать?»**: окно с порядком заказа и контактами; ссылка WhatsApp сразу содержит название товара.
- Адаптивная вёрстка (от 320 px), мобильное меню, доступность (семантика, клавиатура, `prefers-reduced-motion`).

## Технологии

| Слой | Стек |
|------|------|
| Frontend | Vue 3 (Composition API, `<script setup>`), Vue Router, Vite, Vitest, ESLint |
| Backend | Java 21, Spring Boot 3.5 (Web, Data JPA), PostgreSQL |
| Инфраструктура | Docker (multi-stage), Docker Compose |

Сторонние UI-библиотеки не используются: дизайн-система (токены, компоненты, иконки) — собственная.
Шрифты Exo 2 и El Messiri (SIL OFL) подключаются локально в формате woff2.

## Архитектура

```
├── frontend/                  Vue SPA
│   ├── src/api/               HTTP-клиент (таймаут, единые ошибки) и запросы к API
│   ├── src/composables/       общее состояние: каталог (useProducts), окно заказа, прокрутка
│   ├── src/config/            контент и контакты (site.js), справочник категорий (categories.js)
│   ├── src/utils/             чистая бизнес-логика: поиск, фильтрация, категории, склонения
│   ├── src/components/        ui/ (базовые), layout/, product/, contact/, home/ (секции главной)
│   ├── src/views/             страницы: Home, Catalog, NotFound
│   ├── src/styles/            токены дизайн-системы, базовые стили, шрифты
│   └── tests/                 unit-тесты (Vitest)
├── src/main/java/…/atlantic/
│   ├── product/               Product (JPA, только чтение), ProductRepository, ProductService, ProductController
│   ├── web/                   SpaController (history-mode маршруты → index.html), ApiExceptionHandler
│   └── config/                WebConfig (кэширование статики), SecurityHeadersFilter (CSP и др.)
├── src/main/resources/static/ img/products/ — фото товаров (пути хранятся в БД), document/
├── docker/db/init-db.sh       восстановление БД из atlantica.dump в контейнере
└── atlantica.dump             дамп БД с каталогом
```

При сборке Maven копирует `frontend/dist` в `classpath:/static`, поэтому в production SPA, API и фото
товаров отдаются одним Spring Boot-приложением с одного origin (CORS не нужен).

### API

| Метод | Путь | Ответ |
|-------|------|-------|
| GET | `/api/products` | `200` — массив `{ id, name, type, imageUrl }`, отсортирован по `id`; `Cache-Control: max-age=300` |

- `type` — код категории из БД (`ХК`, `ГК`, `Соленая`, `Салат`, `Снеки`, `Вяленая`, `Сладости`, `Другое`);
  человекочитаемые названия задаются во `frontend/src/config/categories.js`.
- `imageUrl` — абсолютный, уже URL-кодированный путь к фото.
- Ошибки возвращаются в формате Problem Details (`application/problem+json`) без внутренних подробностей,
  недоступность БД — `503`.
- API только для чтения; методы записи не реализованы (`405`).

## Переменные окружения

| Переменная | По умолчанию | Назначение |
|------------|--------------|------------|
| `DB_URL` | `jdbc:postgresql://localhost:5432/atlanticdb` | JDBC URL базы |
| `DB_USERNAME` | `atlantic` | пользователь БД |
| `DB_PASSWORD` | — (обязательно) | пароль БД |
| `PORT` | `8080` | порт приложения |

Для Docker Compose значения берутся из файла `.env` (шаблон — `.env.example`; дополнительно `DB_NAME`,
`SITE_PORT`, `DB_PORT`). Файл `.env` не коммитится.

## Запуск

Требования: JDK 21, Node.js ≥ 20.19, Docker (для БД или полного стека).

### Полностью в Docker

```bash
cp .env.example .env        # задайте DB_PASSWORD
docker compose up -d --build
```

Сайт: http://localhost:8080. При первом запуске БД создаётся из `atlantica.dump`.

> Если volume `db_data` был создан прежней версией compose-файла (тогда импорт дампа падал с ошибкой
> `role "postgres" does not exist`), в нём осталась пустая таблица. Пересоздайте его:
> `docker compose down -v && docker compose up -d --build` (**удалит данные в volume**).

### Локальная разработка

```bash
docker compose up -d db                     # PostgreSQL на 127.0.0.1:5432

export DB_PASSWORD='…'                      # тот же, что в .env
./mvnw spring-boot:run                      # backend на :8080

cd frontend && npm install && npm run dev   # frontend на :5173, /api и /img проксируются на :8080
```

### Production-сборка без Docker

```bash
cd frontend && npm ci && npm run build && cd ..
./mvnw clean package
DB_PASSWORD='…' java -jar target/atlantic-0.0.1-SNAPSHOT.jar
```

## Проверки

```bash
./mvnw test                 # backend: unit- и web-тесты (БД не требуется)
cd frontend
npm test                    # frontend: Vitest
npm run lint                # ESLint
npm run build               # сборка
```

## Изменение контента

- Контакты и тексты о заказе — `frontend/src/config/site.js`.
- Названия, порядок и иконки категорий — `frontend/src/config/categories.js`.
- Товары — таблица `products` (поле `img` — путь относительно `src/main/resources/static`).
