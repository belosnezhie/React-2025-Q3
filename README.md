# ⭐ Star Wars Characters App

This application fetches data from the public Star Wars API and displays a list of characters. It includes features such as search, pagination, character detail view, and an **About** page with information about the project creator.

## 🚀 Live Demo



---

## 🧰 Tech Stack

- **React 19**
- **React Router DOM** — declarative nested routing
- **Vite** — fast build tool
- **TypeScript** — static typing
- **ESLint** — code linting
- **Prettier** — code formatting
- **Husky + lint-staged** — pre-commit hooks
- **Vitest** — unit testing and code coverage

---

## 📦 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build the project:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

---

## 🔍 Features

- 🔎 **Search** characters by name
- 📄 **Pagination** through API results
- 👤 **Character detail** page
- 🧑‍💻 **About** page with project creator info
- 🧪 **Unit testing** with code coverage
- ✅ Pre-commit linting & formatting checks

---

## 🧪 Available Scripts

| Script          | Description                                           |
|-----------------|-------------------------------------------------------|
| `dev`           | Start the development server                         |
| `build`         | Build the project (TypeScript + Vite)                |
| `preview`       | Preview the production build                         |
| `lint`          | Run ESLint against the project                       |
| `lint:fix`      | Automatically fix lint issues                        |
| `lint:staged`   | Lint only staged files before commit (via Husky)     |
| `format:fix`    | Format files using Prettier                          |
| `prepare`       | Run Husky setup hook                                 |
| `test`          | Run unit tests with Vitest                           |
| `coverage`      | Generate test coverage report                        |

---

## 🌐 API

This project uses the public Star Wars API:  
🔗 [https://swapi.py4e.com/api](https://swapi.py4e.com/api)

Example endpoints:

- Fetch characters: `https://swapi.py4e.com/api/people/`
- Fetch individual character: `https://swapi.py4e.com/api/people/1/`
