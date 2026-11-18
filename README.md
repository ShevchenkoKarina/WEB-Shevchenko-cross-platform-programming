# Speakly 

<img width="1600" height="800" alt="Застосунок для вивчення інозмених мов" src="https://github.com/user-attachments/assets/53417cf5-4592-4ebe-a12e-a6b9c159bd0b" />


# Speakly - застосунок для вивчення іноземних мов

**Speakly** - навчальний кросплатформний застосунок для вивчення іноземних мов, який розроблювався впродовжж семестру. Основний функціонал - користувач додає слова з перекладом до власного словника, переглядає їх, шукає, та видаляє, а дані зберігаються між запусками.

---

## Архітектурна схема проєкту

<img width="1280" height="872" alt="image" src="https://github.com/user-attachments/assets/d673efec-9870-4b6d-891c-5db70485d0d8" />

---

## Структура репозиторію

Репозиторій містить усі лабораторні роботи з дисципліни. 

```text
WEB-Shevchenko-cross-platform-programming/
├── cross-platform-lab-1/     # ЛР №1: налаштування середовища, порівняльний аналіз підходів
├── speakly-server/           # ЛР №2: REST API (Node.js, Express, MongoDB)
├── graphql-auth-lab3/        # ЛР №3: GraphQL API (Apollo Server, JWT)
├── speakly-lessons/          # ЛР №4: веб-версія SPA (React, Vite, Tailwind CSS)
├── vocab-words/              # ЛР №5: мобільний застосунок (React Native, Expo)
├── speakly-desktop/          # ЛР №6: десктопний застосунок (Electron)
└── speakly-monorepo/         # ЛР №7-8: монорепозиторій зі спільним ядром
    ├── packages/
    │   ├── core/             # Спільна бізнес-логіка (@speakly/core)
    │   ├── web/              # Веб-клієнт (localStorage)
    │   └── desktop/          # Десктопний клієнт Electron (words.json, IPC)
    ├── package.json
    └── README.md             # Цей файл
```

| Лабораторна | Тека | Що реалізовано |
|---|---|---|
| №1 | [`cross-platform-lab-2`](../cross-platform-lab-2) | Вебсторінка Speakly, налаштування середовища |
| №2 | [`speakly-server`](../speakly-server) | REST API з CRUD і MongoDB Atlas |
| №3 | [`graphql-auth-lab3`](../graphql-auth-lab3) | GraphQL API з JWT-автентифікацією |
| №4 | [`speakly-lessons-spa`](../speakly-lessons-spa) | Веб-версія SPA на React, Vite і Tailwind CSS |
| №5 | [`vocab-words`](../vocab-words) | Мобільний застосунок на React Native |
| №6 | [`speakly-desktop`](../speakly-desktop) | Десктопний застосунок на Electron |
| №7-8 | [`speakly-monorepo`](../speakly-monorepo) | Монорепозиторій: спільне ядро, веб- і десктопний клієнти з тестами |

---

## Репозиторій GitHub

[ShevchenkoKarina / WEB-Shevchenko-cross-platform-programming](https://github.com/ShevchenkoKarina/WEB-Shevchenko-cross-platform-programming)
