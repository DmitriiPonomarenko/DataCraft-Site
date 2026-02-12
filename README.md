# DataCraft — корпоративный сервер Minecraft

Современный сайт для корпоративного сервера Minecraft команды Data Science.

## Технологии

- **React 18** — функциональные компоненты, хуки
- **Tailwind CSS 3** — стили и адаптивность
- **Framer Motion** — анимации и переходы
- **React Router** — маршрутизация
- **Vite** — сборка и dev-сервер

## Структура проекта

```
src/
├── components/     # Header, Hero, About, Features, Rules, Stats, Plugins, Gallery, FAQ, HowToConnect, Footer
├── context/        # ServerContext (игроки, статистика), ThemeContext (тема)
├── hooks/          # useOnlinePlayers, useScrollAnimation, useCopyAddress
├── utils/          # animations.js, threejs/MinecraftBlock.jsx
├── App.jsx
└── main.jsx
```

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Сборка для деплоя

```bash
npm run build
```

Результат в папке `dist/`. Раздавайте через любой статический хостинг (Vercel, Netlify, nginx).

## Ресурсы

- Изображения и фавикон должны находиться в `public/img/` и `public/favicon.ico`. При первом клонировании скопируйте папку `img` и файл `favicon.ico` в `public/`, если их там ещё нет.

## Функции

- Онлайн-статус сервера и список игроков (API mcstatus.io / mcsrvstat.us)
- Копирование адреса сервера в буфер обмена
- Адаптивная вёрстка и мобильное меню
- SEO: мета-теги, Schema.org, React Helmet Async
- Lazy loading галереи и изображений
