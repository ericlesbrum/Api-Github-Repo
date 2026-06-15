# API GitHub Dev — React Study Project

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled--Components-6-DB7093?logo=styled-components&logoColor=white)

A hands-on **React 19** study project built to consolidate fundamental and intermediate concepts of the framework. The project consumes the **GitHub API** (or a local mock via JSON Server) to display user profiles and repositories, covering everything from component creation to state management, side effects, routing, CSS-in-JS styling, and custom hook development.

> 🇧🇷 **[Leia em Português](README.pt-br.md)** | 🇺🇸 **[Read in English](README.en.md)**

---

## Table of Contents

- [Study Objectives](#study-objectives)
- [React Concepts Practiced](#react-concepts-practiced)
- [Project Features](#project-features)
- [Visual Demo](#visual-demo)
- [Project Structure](#project-structure)
- [Concept-to-File Map](#concept-to-file-map)
- [Technologies Used](#technologies-used)
- [Prerequisites and Installation](#prerequisites-and-installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)

---

## Study Objectives

This project was created as a practical exercise to learn and apply:

1. **Functional components** — building interfaces with reusable components and component composition
2. **React Hooks** — intensive use of `useState`, `useEffect`, `useMemo`, `useCallback` and creating custom hooks
3. **State management** — local state with `useState`, lifting state up, and unidirectional data flow
4. **Side effects** — async data loading with `useEffect` and cleanup
5. **Routing** — page navigation with React Router DOM, URL parameters, and programmatic navigation
6. **CSS-in-JS** — styling with Styled Components, theming with `ThemeProvider`, and global styles
7. **API consumption** — HTTP requests with Axios, data handling, and loading states
8. **Best practices** — prop validation, folder organization, separation of concerns, and modular code

---

## React Concepts Practiced

### Hooks

| Hook          | Concept Learned                                                                                   | Primary File                           |
| ------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `useState`    | Local state management — input control, filters, loaded data, and loading state                   | `src/pages/RepositoriesPage/index.jsx` |
| `useEffect`   | Side effects — data loading on component mount, async fetch with `Promise.all`                    | `src/pages/RepositoriesPage/index.jsx` |
| `useMemo`     | Memoization — total page count and paginated data calculation to avoid unnecessary re-renders     | `src/hooks/usePagination.js`           |
| `useCallback` | Function stabilization — page navigation functions maintain stable references to avoid re-renders | `src/hooks/usePagination.js`           |
| `useParams`   | Accessing URL parameters — extracting the user `login` from a dynamic route                       | `src/pages/RepositoriesPage/index.jsx` |
| `useNavigate` | Programmatic navigation — redirecting on Enter key press or search button click                   | `src/pages/MainPage/index.jsx`         |

### Custom Hook

The project includes a **custom hook** (`usePagination`) to extract and reuse pagination logic. This demonstrates:

- Encapsulating complex logic into a reusable function
- Combined use of `useState`, `useEffect`, `useMemo`, and `useCallback` within a single hook
- Input parameters and destructured return values
- Automatic state reset via `resetDependency`

```javascript
// Simplified custom hook example
export function usePagination({ data, itemsPerPage, resetDependency }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Resets when filter changes
  }, [resetDependency]);

  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage],
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  return { currentPage, totalPages, paginatedData, goToPrevious, goToNext };
}
```

### Architecture Patterns

| Pattern                      | Application in the Project                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| **Component Composition**    | `RepositoriesPage` composes `Profile`, `Filter`, and `Repositories` as child components      |
| **Lifting State Up**         | `currentLanguage` state is kept in the parent (`RepositoriesPage`) and passed down via props |
| **Container/Presentational** | Pages (containers) manage data and logic; inner components (presentational) render the UI    |
| **Single Responsibility**    | Each component handles a single responsibility (profile, filter, list, pagination)           |
| **Reusable Logic (Hooks)**   | Pagination logic extracted into `usePagination` and reused by the `Pagination` component     |

### Data Flow

```
MainPage
  └── navigate(/:login/repositories)  ──→  URL changes

RepositoriesPage
  ├── useParams() extracts "login"
  ├── useEffect() loads data via API
  │     ├── getUser(login)    → setState(user)
  │     └── getRepos(login)   → setState(repositories)
  │                             → setState(languages)
  │
  ├── Profile          ← props: { user }
  ├── Filter           ← props: { languages, currentLanguage, onClick }
  │                       onClick updates parent state (lifting state up)
  └── Repositories     ← props: { repositories, currentLanguage }
        ├── Filters by language (filter)
        └── usePagination() paginates the data
              └── Pagination ← props: { currentPage, totalPages, onPrevious, onNext }
```

---

## Project Features

- **User search** — type a GitHub user's login on the homepage and press **Enter** or click the search button
- **User profile** — displays avatar, name, login, followers, company, location, and blog
- **Repository list** — responsive grid with cards showing name, description, language, and link
- **Language filter** — sidebar with buttons to filter repositories by programming language
- **Pagination** — page navigation with 9 items per page, resetting when the filter changes
- **Custom dark theme** — dark color palette inspired by GitHub with `ThemeProvider`

---

## Visual Demo

```
┌─────────────────────────────────────────────────────────┐
│                    Homepage                              │
│                                                         │
│                   🔍 API Github                         │
│     Explore GitHub profiles and repositories            │
│                                                         │
│            ┌──────────────────────┬─────┐               │
│            │ Enter login...       │  🔎 │               │
│            └──────────────────────┴─────┘               │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────────────────┐
│      Sidebar         │         Repositories             │
│  ┌────────────────┐  │  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │    Avatar      │  │  │ Repo │ │ Repo │ │ Repo │    │
│  │  Name          │  │  └──────┘ └──────┘ └──────┘    │
│  │  @login        │  │  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │  👥 150        │  │  │ Repo │ │ Repo │ │ Repo │    │
│  │  🏢 Company    │  │  └──────┘ └──────┘ └──────┘    │
│  │  📍 Location   │  │  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │  🔗 Blog       │  │  │ Repo │ │ Repo │ │ Repo │    │
│  └────────────────┘  │  └──────┘ └──────┘ └──────┘    │
│                      │                                  │
│  Filter:             │        < 1 2 3 ... >             │
│  [JavaScript] (12)   │                                  │
│  [Python] (5)        │                                  │
│  [HTML] (3)          │                                  │
└──────────────────────┴──────────────────────────────────┘
```

---

## Project Structure

```
api-github-dev/
├── src/
│   ├── components/
│   │   └── Pagination/       # Reusable pagination component
│   │       ├── index.jsx
│   │       └── styles.js
│   ├── hooks/
│   │   └── usePagination.js  # Custom pagination hook ← HOOKS STUDY
│   ├── pages/
│   │   ├── MainPage/         # Homepage with search form
│   │   │   ├── index.jsx     # ← useState, useNavigate
│   │   │   └── styles.js
│   │   └── RepositoriesPage/ # Main data page
│   │       ├── index.jsx     # ← useEffect, useParams, lifting state up
│   │       ├── styles.js
│   │       ├── Profile/      # Profile card ← presentational components
│   │       ├── Filter/       # Language filter ← props callbacks
│   │       └── Repositories/ # Grid with pagination ← useMemo, filter
│   │           └── Repository/ # Individual repository card
│   ├── services/
│   │   └── api.js            # Axios setup ← API consumption
│   ├── styles/
│   │   ├── Theme.jsx         # ThemeProvider ← styled-components Context API
│   │   ├── global.js         # createGlobalStyle ← global styles
│   │   └── langConfigColors.js # Pure utility (no React dependency)
│   ├── App.jsx               # Root: BrowserRouter + ThemeProvider + GlobalStyle
│   ├── main.jsx              # Entry point: ReactDOM.createRoot
│   └── routes.jsx            # Route definitions ← React Router
├── .env                      # Environment variables (VITE_API_BASE_URL)
├── routes.json               # JSON Server routes
├── package.json
└── vite.config.js
```

---

## Concept-to-File Map

| File                                                | React Concepts / Best Practices                                           |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| `src/main.jsx`                                      | Entry point, `createRoot` (React 18+ API)                                 |
| `src/App.jsx`                                       | Provider composition (`BrowserRouter`, `ThemeProvider`, `GlobalStyle`)    |
| `src/routes.jsx`                                    | `Routes` and `Route`, nested routes, element prop                         |
| `src/pages/MainPage/index.jsx`                      | `useState` (controlled input), `useNavigate`, `onKeyDown`, event handling |
| `src/pages/RepositoriesPage/index.jsx`              | `useEffect` (async fetch), `useParams`, `Promise.all`, lifting state up   |
| `src/pages/RepositoriesPage/Profile/index.jsx`      | Presentational component, props reception                                 |
| `src/pages/RepositoriesPage/Filter/index.jsx`       | Props callback (`onClick`), conditional rendering                         |
| `src/pages/RepositoriesPage/Repositories/index.jsx` | Implicit `useMemo` via filter, component composition                      |
| `src/hooks/usePagination.js`                        | Custom hook, `useState`, `useEffect`, `useMemo`, `useCallback`            |
| `src/components/Pagination/index.jsx`               | Reusable component, callback props                                        |
| `src/services/api.js`                               | Layer separation, `axios.create`, environment variables                   |
| `src/styles/Theme.jsx`                              | `ThemeProvider`, theme object, prop-types                                 |
| `src/styles/global.js`                              | `createGlobalStyle`, theme access via props                               |
| `src/styles/langConfigColors.js`                    | Pure logic (utility function with no React dependency)                    |

---

## Technologies Used

### Core

| Technology           | Version | Purpose                               |
| -------------------- | ------- | ------------------------------------- |
| **React**            | 19      | UI component library                  |
| **React DOM**        | 19      | Rendering React components in the DOM |
| **React Router DOM** | 7       | Routing and page navigation           |

### Styling

| Technology            | Version | Purpose                                      |
| --------------------- | ------- | -------------------------------------------- |
| **Styled Components** | 6       | CSS-in-JS with component scoping and theming |
| **styled-normalize**  | 8       | Cross-browser style normalization            |

### Infrastructure

| Technology      | Version | Purpose                                          |
| --------------- | ------- | ------------------------------------------------ |
| **Vite**        | 8       | Build tool with HMR and production optimizations |
| **Axios**       | 1       | HTTP client for API requests                     |
| **JSON Server** | 0.17    | REST API mock for development                    |

### Code Quality

| Technology      | Version | Purpose                              |
| --------------- | ------- | ------------------------------------ |
| **ESLint**      | 10      | Static analysis and error detection  |
| **Prettier**    | 3       | Consistent code formatting           |
| **prop-types**  | 15      | Runtime prop type validation         |
| **React Icons** | 5       | Icon library (Material Design icons) |

---

## Prerequisites and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher
- npm (comes bundled with Node.js)

### Installation and Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-user/api-github-dev.git
cd api-github-dev

# 2. Install dependencies
npm install

# 3. Start JSON Server (API mock) in one terminal
npm run json-server

# 4. In another terminal, start the development server
npm run dev
```

The project will be available at **http://localhost:5173**.

> **Important:** JSON Server must be running for data requests to work. Make sure to create the `db.json` file in the project root with mock data before starting the server.

---

## Environment Variables

Create a `.env` file in the project root to configure the API base URL. You can use either the local JSON Server or the official GitHub API:

### Option 1 — JSON Server (local mock)

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Option 2 — Official GitHub API

```env
VITE_API_BASE_URL=https://api.github.com
```

| Variable            | Description               | Default                 |
| ------------------- | ------------------------- | ----------------------- |
| `VITE_API_BASE_URL` | Base URL for API requests | `http://localhost:5000` |

> **Note:** The `.env` file is in `.gitignore` to prevent sensitive data or local configurations from being versioned.

---

## Available Scripts

| Command               | Description                             |
| --------------------- | --------------------------------------- |
| `npm run dev`         | Start the development server (Vite)     |
| `npm run build`       | Generate production build in `dist/`    |
| `npm run preview`     | Serve the production build locally      |
| `npm run lint`        | Run ESLint on `.js` and `.jsx` files    |
| `npm run lint:fix`    | Automatically fix lint issues           |
| `npm run format`      | Format code with Prettier               |
| `npm run json-server` | Start the JSON mock server on port 5000 |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
