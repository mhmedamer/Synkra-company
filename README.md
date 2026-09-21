# Synkra — Front-End React Project

A multi-page marketing/product website built with React 19 and React Router 8. The project is currently in its **initial scaffold phase** — all routes and pages are wired up and ready for content, but the UI implementation is still ahead. This README exists to help every new team member understand exactly how the project is structured, how tooling is configured, and how to contribute safely from day one.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Getting Started](#2-getting-started)
3. [Project Structure](#3-project-structure)
4. [Architecture](#4-architecture)
5. [CSS Modules](#5-css-modules)
6. [ESLint](#6-eslint)
7. [Prettier](#7-prettier)
8. [ESLint + Prettier Relationship](#8-eslint--prettier-relationship)
9. [VS Code Setup](#9-vs-code-setup)
10. [Git & Team Workflow](#10-git--team-workflow)
11. [Common Developer Tasks](#11-common-developer-tasks)
12. [Environment Variables](#12-environment-variables)
13. [Dependencies](#13-dependencies)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Project Overview

| Property            | Value                            |
| ------------------- | -------------------------------- |
| **Project name**    | `synkra-project`                 |
| **React version**   | 19.2.8                           |
| **Router**          | React Router 8.3.1               |
| **Build tool**      | Vite 8.2.2                       |
| **Package manager** | npm (lockfile version 3)         |
| **Language**        | JavaScript (JSX) — no TypeScript |
| **Styling**         | CSS Modules + global `index.css` |

The site has seven pages: Home, Features, About, Blog, Blog Details, Challenging, and Pricing. The full-page layout wraps every route with a shared `Navbar` at the top and `Footer` at the bottom.

---

## 2. Getting Started

### Node.js requirement

Vite 8 requires **Node.js `^20.19.0` or `>=22.12.0`**. Check your version before starting:

```bash
node -v
```

If your version is outside that range, use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to switch.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Omar-Ali-Abdallatif/front-end-react.git
cd front-end-react

# 2. Install dependencies
npm install
```

### Environment variables

There are no `.env` files in this project at this time. No environment variables are required to run locally. If the team adds any in the future, create a `.env.local` file at the project root (it is already `.gitignore`d via the `*.local` pattern).

### Available scripts

All scripts are defined in `package.json`:

| Script         | Command              | What it does                                                                           |
| -------------- | -------------------- | -------------------------------------------------------------------------------------- |
| `dev`          | `vite`               | Starts the Vite dev server with HMR at `http://localhost:5173`                         |
| `build`        | `vite build`         | Compiles and bundles the app for production into `dist/`                               |
| `preview`      | `vite preview`       | Serves the production `dist/` build locally for a final check                          |
| `lint`         | `eslint .`           | Runs ESLint across all `.js` and `.jsx` files                                          |
| `format`       | `prettier . --write` | Formats every file in the project in-place                                             |
| `format:check` | `prettier . --check` | Checks formatting without writing — exits non-zero if any file is wrong (useful in CI) |

```bash
# Start development
npm run dev

# Check for lint errors
npm run lint

# Format all files
npm run format

# Production build
npm run build

# Preview the production build
npm run preview
```

---

## 3. Project Structure

```text
synkra-project/
├── public/
│   ├── favicon.svg          # Browser tab icon
│
├── src/
│   ├── assets/              # Static assets (images, fonts, etc.) imported by components
│   ├── components/          # Shared UI components used across multiple pages
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   └── Navbar/
│   │       ├── Navbar.jsx
│   │       └── Navbar.module.css
│   ├── pages/               # One folder per route; each page is self-contained
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.module.css
│   │   ├── Blog/
│   │   │   ├── Blog.jsx
│   │   │   └── Blog.module.css
│   │   ├── BlogDetails/
│   │   │   ├── BlogDetails.jsx
│   │   │   └── BlogDetails.module.css
│   │   ├── Challenging/
│   │   │   ├── Challenging.jsx
│   │   │   └── Challenging.module.css
│   │   ├── Features/
│   │   │   ├── Features.jsx
│   │   │   └── Features.module.css
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   └── Pricing/
│   │       ├── Pricing.jsx
│   │       └── Pricing.module.css
│   ├── App.jsx              # Root component — defines all routes
│   ├── index.css            # Global CSS reset and base styles
│   └── main.jsx             # Entry point — mounts React into #root
├── .gitignore
├── .prettierrc              # Prettier formatting rules
├── eslint.config.js         # ESLint Flat Config
├── index.html               # HTML shell
├── package.json
├── package-lock.json
└── vite.config.js           # Vite configuration
```

### Folder responsibilities

**`src/components/`** — Reusable UI pieces that appear on more than one page. Currently contains `Navbar` and `Footer`, which are rendered on every route via `App.jsx`. Any new shared component (button, card, modal, etc.) goes here, in its own subfolder following the `ComponentName/ComponentName.jsx` + `ComponentName.module.css` pattern.

**`src/pages/`** — One folder per URL route. Each page folder owns its own JSX and CSS Module. Pages are not shared; they represent a full screen the user navigates to. Add a new page here when you add a new route to `App.jsx`.

**`src/assets/`** — Static files (images, fonts, SVGs) that are imported directly by JavaScript/JSX. Files here are bundled by Vite and get content-hashed filenames in production. Currently empty — add assets here as the UI is built out.

**`public/`** — Files served as-is without processing. `favicon.svg` and `icons.svg` live here. Reference them by absolute path (`/favicon.svg`), not by import.

**`src/index.css`** — Global reset and base styles applied to every page. Currently sets `box-sizing: border-box`, strips default margin/padding, and ensures `min-height: 100vh` on `body`. Keep this file minimal — use CSS Modules for component-scoped styles.

**`src/App.jsx`** — The single source of truth for routing. All `<Route>` definitions live here.

**`src/main.jsx`** — Entry point only. Do not add business logic here.

---

## 4. Architecture

### How the app is assembled

```
main.jsx
  └── <App />
        └── <BrowserRouter>
              ├── <Navbar />          ← rendered on every page
              ├── <Routes>
              │     ├── /             → <Home />
              │     ├── /features     → <Features />
              │     ├── /about        → <About />
              │     ├── /blog         → <Blog />
              │     ├── /blogdetails  → <BlogDetails />
              │     ├── /challenging  → <Challenging />
              │     ├── /pricing      → <Pricing />
              │     └── *             → <h1>404</h1>
              └── <Footer />          ← rendered on every page
```

### Routing

Routing is handled by **React Router 8** (`react-router` package) using the standard `<BrowserRouter>` + `<Routes>` + `<Route>` API. All routes are declared in `src/App.jsx`. There is no lazy loading at this stage — every page is eagerly imported.

### Styling pattern

Every component and page uses a **CSS Module** (`.module.css`) for its own scoped styles. Class names are imported as an object:

```jsx
import styles from './Home.module.css';

function Home() {
  return <section className={styles.hero}>...</section>;
}
```

This prevents class name collisions between components. Global styles that need to apply everywhere (typography defaults, CSS variables, resets) belong in `src/index.css`.

### State management

There is no global state management library in the project at this stage (no Redux, Zustand, Context, etc.). State lives locally inside components using React's built-in `useState` and `useEffect`. If shared state becomes necessary as the project grows, the team should agree on an approach before adding a library.

### No custom hooks or services yet

There is no `hooks/`, `services/`, or `utils/` folder at this point. When these are needed:

- Custom hooks → create `src/hooks/`
- API/data-fetching logic → create `src/services/`
- Shared helper functions → create `src/utils/`

---

## 5. CSS Modules

### What CSS Modules are

A CSS Module is a `.css` file where every class name is automatically scoped to the component that imports it. Vite supports CSS Modules out of the box — no extra configuration or packages are needed in this project.

When Vite processes a `.module.css` file, it transforms each class name into a unique, collision-proof string (e.g., `hero` becomes something like `Home_hero__3xKp1` in the browser). This means you can use short, descriptive class names like `.hero` or `.card` in every component without any risk of one component's styles leaking into another.

### Why this project uses CSS Modules

Every component and page in this project already has its own `.module.css` file created alongside its `.jsx` file:

```
src/components/Navbar/
├── Navbar.jsx
└── Navbar.module.css   ← scoped styles for Navbar only

src/pages/Home/
├── Home.jsx
└── Home.module.css     ← scoped styles for Home only
```

This is the project's only styling mechanism aside from the global reset in `src/index.css`. There is no CSS-in-JS library, no Tailwind, and no Sass — plain CSS Modules with standard CSS syntax.

### File naming

CSS Module files must use the `.module.css` extension. This is what tells Vite to process them as modules rather than injecting them as global styles.

| ✅ Correct               | ❌ Incorrect                            |
| ------------------------ | --------------------------------------- |
| `Navbar.module.css`      | `Navbar.css`                            |
| `Home.module.css`        | `home-styles.css`                       |
| `HeroSection.module.css` | `hero.module.scss` (Sass not installed) |

Name the file after the component it belongs to, using the same `PascalCase` as the component itself.

### Importing and using a CSS Module

Import the module as a default import at the top of the component file. The conventional name for the import is `styles`:

```jsx
// src/pages/Home/Home.jsx
import styles from './Home.module.css';

function Home() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Welcome to Synkra</h1>
    </section>
  );
}

export default Home;
```

The corresponding CSS file uses plain class selectors — no special syntax needed:

```css
/* src/pages/Home/Home.module.css */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
}
```

> **Always use `className={styles.className}`** — not a plain string like `className="hero"`. A plain string bypasses the module system and will reference a global class that does not exist.

### Combining multiple classes

Use a template literal to apply more than one class to the same element:

```jsx
<button className={`${styles.btn} ${styles.btnPrimary}`}>Get Started</button>
```

```css
/* Pricing.module.css */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btnPrimary {
  background-color: #4f46e5;
  color: #fff;
}
```

Avoid constructing class strings dynamically from variables unless you have a clear reason — it makes styles harder to trace.

### Conditional classes

When a class should only be applied based on state or a prop, use a ternary inside the template literal:

```jsx
<li className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
  Features
</li>
```

### Responsive styles and media queries

Write `@media` queries directly inside the `.module.css` file. They are scoped like any other rule:

```css
/* Navbar.module.css */
.navList {
  display: flex;
  gap: 2rem;
}

@media (max-width: 768px) {
  .navList {
    display: none;
  }

  .navList.open {
    display: flex;
    flex-direction: column;
  }
}
```

### Pseudo-classes and pseudo-elements

Use them directly on the scoped class — no special handling required:

```css
/* Footer.module.css */
.link {
  color: #a5b4fc;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.divider::before {
  content: '';
  display: block;
  height: 1px;
  background: #e5e7eb;
}
```

### Nested selectors

CSS Modules support standard CSS nesting (native CSS nesting, no preprocessor needed in modern browsers via Vite). Keep nesting shallow — one level is usually enough:

```css
/* Blog.module.css */
.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
}

.card .cardTitle {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
```

Reference nested elements as separate `styles.cardTitle` class names in JSX — do not rely on the descendant selector alone if the inner element might be reused independently.

### Global styles vs. module styles

| Use `src/index.css` for                          | Use a `.module.css` file for                                 |
| ------------------------------------------------ | ------------------------------------------------------------ |
| CSS reset (`box-sizing`, `margin`, `padding`)    | Any component-specific layout or appearance                  |
| Base `body` styles (`min-height`, `font-family`) | Page sections, cards, buttons, typography within a component |
| CSS custom properties (if added in future)       | Hover states, responsive breakpoints for one component       |

Do not add component-specific styles to `index.css`. Keep it minimal — it is the only file whose styles are truly global.

### What to avoid

- **Do not use plain `className="myClass"`** to reference a module class — it will silently do nothing because the scoped class name is different at runtime.
- **Do not import a `.module.css` from a different component** to reuse its classes. Extract shared styles into a shared component instead.
- **Do not create a non-module `.css` file** alongside a component (e.g., `Navbar.css`). Unless you intentionally want global styles, always use `.module.css`.
- **Do not use `!important`** — if specificity is a problem, restructure the selectors.

---

## 6. ESLint

### Configuration format

The project uses **ESLint Flat Config** — the modern configuration system introduced in ESLint 9+. The config lives in `eslint.config.js` (not `.eslintrc`). There is no `.eslintrc` file; if you see one, it should not be there.

### What is configured

```js
// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  eslintConfigPrettier,
]);
```

### Active rule sets

| Plugin / Config                             | What it enforces                                                                                                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@eslint/js` recommended                    | Core JavaScript rules: no unused variables, no undeclared variables, no `var`, etc.                                                                                       |
| `eslint-plugin-react-hooks` recommended     | Enforces the Rules of Hooks (`rules-of-hooks`, `exhaustive-deps`). Calling a hook conditionally or in a loop is an error.                                                 |
| `eslint-plugin-react-refresh` (vite preset) | Warns when a component file exports something other than React components, which would break Vite's HMR.                                                                  |
| `eslint-config-prettier`                    | **Disables all ESLint rules that conflict with Prettier's formatting.** This is the last config in the array so it overrides any formatting rules from the configs above. |

### What developers should expect

- **Unused variables are errors.** Remove them or prefix with `_` if intentional.
- **Hook rules are strict.** Do not call hooks inside conditions, loops, or nested functions.
- **The `dist/` folder is ignored.** ESLint will not lint build output.
- **Formatting is NOT ESLint's job.** Prettier handles that (see below).

### Running ESLint

```bash
# Check for lint errors
npm run lint

# ESLint does not have a --fix script defined in package.json.
# You can run the fix manually:
npx eslint . --fix
```

> Note: `npm run lint -- --fix` also works because npm forwards extra arguments after `--` to the underlying command.

---

## 7. Prettier

### Configuration

Prettier is configured via `.prettierrc` at the project root:

```json
{
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "endOfLine": "lf"
}
```

### What these rules mean for your code

| Rule            | Value   | Effect                                                                                                    |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `semi`          | `true`  | Semicolons are **required** at the end of statements.                                                     |
| `tabWidth`      | `2`     | Indentation uses **2 spaces** (never tabs).                                                               |
| `singleQuote`   | `true`  | Strings use **single quotes** — `'hello'`, not `"hello"`.                                                 |
| `trailingComma` | `"all"` | Trailing commas are added **everywhere valid** (function parameters, arrays, objects, import lists).      |
| `endOfLine`     | `"lf"`  | Line endings are Unix-style `\n`. On Windows, ensure your editor is configured to save with LF, not CRLF. |

All other Prettier options (print width, bracket spacing, arrow function parens, JSX formatting) use Prettier's defaults:

- Print width: 80 characters
- Bracket spacing: `true` — `{ foo: bar }` not `{foo: bar}`
- Arrow function parens: `"always"` — `(x) => x`, not `x => x`
- JSX single quote: `false` — JSX attributes use double quotes

### Running Prettier

```bash
# Format every file in the project (writes changes to disk)
npm run format

# Check formatting without changing files (use in CI or before committing)
npm run format:check
```

If `npm run format:check` exits with a non-zero code, there are files that need formatting. Run `npm run format` to fix them.

---

## 8. ESLint + Prettier Relationship

### The division of responsibility

```
Prettier                          ESLint
────────────────────────          ────────────────────────────────────
Code formatting                   Code quality & correctness
  - semicolons                      - unused variables
  - quotes                          - React hook rules
  - trailing commas                 - undeclared globals
  - indentation                     - HMR-breaking exports
  - line endings
  - print width
```

### How conflicts are prevented

`eslint-config-prettier` is installed and placed **last** in the ESLint config array. It turns off every ESLint rule that would conflict with or duplicate Prettier's formatting decisions. This means:

- ESLint will never complain about a semicolon or quote style.
- Prettier is the single source of truth for all formatting.
- You will not get conflicting errors from both tools at once.

### Recommended workflow before committing

```bash
# 1. Format first — fix all formatting issues
npm run format

# 2. Lint second — check for code quality errors
npm run lint

# 3. Fix any remaining lint errors manually
# 4. Then commit
```

There are no pre-commit hooks (Husky, lint-staged) set up yet, so this workflow is manual. See the Git workflow section below.

---

## 9. VS Code Setup

### What exists in the project

The `.gitignore` contains:

```
.vscode/*
!.vscode/extensions.json
```

This means the team intends to share a `.vscode/extensions.json` file (the `!` un-ignores it), but **that file does not exist yet** in the repository. There is no `.vscode/settings.json` in the project.

### Recommended VS Code setup

Until `.vscode/settings.json` and `.vscode/extensions.json` are added to the repo, configure your editor manually with these settings.

**Recommended extensions:**

| Extension | ID                       | Purpose                                           |
| --------- | ------------------------ | ------------------------------------------------- |
| ESLint    | `dbaeumer.vscode-eslint` | Shows lint errors inline as you type              |
| Prettier  | `esbenp.prettier-vscode` | Formats on save using the project's `.prettierrc` |

**Recommended `settings.json` (add to your local `.vscode/settings.json`):**

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.useFlatConfig": true
}
```

`"eslint.useFlatConfig": true` is important — it tells the ESLint VS Code extension to use Flat Config (`eslint.config.js`) instead of looking for a legacy `.eslintrc` file.

> **Team action item:** Once this config is agreed upon, commit `.vscode/settings.json` and `.vscode/extensions.json` to the repository so every team member gets the same experience automatically.

---

## 10. Git & Team Workflow

### Branches

The repository has two branches:

| Branch | Purpose                                           |
| ------ | ------------------------------------------------- |
| `main` | Stable, production-ready code                     |
| `dev`  | Active development — this is where the team works |

The `dev` branch was created from `main` and is tracked against `origin/dev`. **Do not commit directly to `main`.**

### Suggested team workflow

> No Git hooks (Husky, lint-staged, commitlint) or CI checks are currently configured. The workflow below is a recommendation for the team to follow manually until automation is added.

```bash
# 1. Start from dev and make sure it's up to date
git checkout dev
git pull origin dev

# 2. Create a feature branch
git checkout -b feature/navbar-implementation

# 3. Do your work, then before committing:
npm run format        # format all files
npm run lint          # check for lint errors

# 4. Commit with a clear message
git add .
git commit -m "feat: implement responsive Navbar"

# 5. Push your branch
git push origin feature/navbar-implementation

# 6. Open a Pull Request into dev (not main)
```

### Branch naming suggestions

```
feature/   → new features       (feature/pricing-page-ui)
fix/       → bug fixes          (fix/navbar-mobile-overflow)
chore/     → maintenance tasks  (chore/add-vscode-settings)
```

### Before opening a PR

- [ ] `npm run format` — all files are formatted
- [ ] `npm run lint` — zero lint errors
- [ ] `npm run build` — build completes without errors
- [ ] Your branch is up to date with `dev`

---

## 11. Common Developer Tasks

### Add a new shared component

Create a new folder inside `src/components/` following the existing pattern:

```
src/components/
└── Button/
    ├── Button.jsx
    └── Button.module.css
```

```jsx
// src/components/Button/Button.jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

export default Button;
```

Use CSS Modules for all styles. Import the component by its full path:

```jsx
import Button from '../../components/Button/Button';
```

### Add a new page

1. Create a new folder in `src/pages/` with its `.jsx` and `.module.css` files:

```
src/pages/
└── Contact/
    ├── Contact.jsx
    └── Contact.module.css
```

2. Add the route to `src/App.jsx`:

```jsx
import Contact from './pages/Contact/Contact';

// Inside <Routes>:
<Route path="/contact" element={<Contact />} />;
```

### Add a sub-component inside a page

If a page becomes complex, break it into smaller components that are local to that page only. Keep them inside the page's folder:

```
src/pages/Home/
├── Home.jsx
├── Home.module.css
├── HeroSection.jsx        ← local to Home only
└── HeroSection.module.css
```

Import them directly in `Home.jsx`. Only promote them to `src/components/` if another page also needs them.

### Add a custom hook

Create a `src/hooks/` directory (it does not exist yet) and add your hook there:

```
src/hooks/
└── useWindowSize.js
```

```js
// src/hooks/useWindowSize.js
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth });

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}

export default useWindowSize;
```

### Add API / data-fetching logic

Create a `src/services/` directory (it does not exist yet) and add service functions there:

```
src/services/
└── blogService.js
```

```js
// src/services/blogService.js
const BASE_URL = 'https://api.example.com';

export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}
```

Import and call the service from your page or a custom hook — not directly from `main.jsx` or `App.jsx`.

### Add shared utility functions

Create a `src/utils/` directory (it does not exist yet):

```
src/utils/
└── formatDate.js
```

---

## 12. Environment Variables

No environment variables are currently defined or used in this project. There are no `.env`, `.env.example`, `.env.local`, or `.env.production` files.

If the team needs to add them in the future:

- Create a `.env.local` file at the project root (already git-ignored).
- In Vite projects, **only variables prefixed with `VITE_`** are exposed to the browser bundle. Variables without this prefix are server-only and will be `undefined` in your React code.

```bash
# .env.local (example — do not commit real secrets)
VITE_API_BASE_URL=https://api.example.com
```

Access in code:

```js
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

Add a `.env.example` file with placeholder values when real environment variables are introduced, so other developers know what to configure.

---

## 13. Dependencies

### Runtime dependencies

| Package        | Version | Purpose                                                  |
| -------------- | ------- | -------------------------------------------------------- |
| `react`        | ^19.2.8 | Core UI library                                          |
| `react-dom`    | ^19.2.8 | Renders React components into the browser DOM            |
| `react-router` | ^8.3.1  | Client-side routing — `BrowserRouter`, `Routes`, `Route` |

### Dev dependencies

| Package                       | Version  | Purpose                                                                            |
| ----------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `vite`                        | ^8.2.2   | Build tool and dev server with HMR                                                 |
| `@vitejs/plugin-react`        | ^6.1.0   | Enables React/JSX support in Vite (uses Oxc/Babel)                                 |
| `eslint`                      | ^10.9.0  | JavaScript linter                                                                  |
| `@eslint/js`                  | ^10.0.1  | ESLint's recommended JS rule set                                                   |
| `eslint-plugin-react-hooks`   | ^7.1.1   | Enforces React Hook rules                                                          |
| `eslint-plugin-react-refresh` | ^0.5.4   | Warns about exports that break Vite HMR                                            |
| `eslint-config-prettier`      | ^10.1.8  | Disables ESLint rules that conflict with Prettier                                  |
| `prettier`                    | ^3.9.6   | Code formatter                                                                     |
| `globals`                     | ^17.11.0 | Provides global variable lists (e.g., `browser`) for ESLint                        |
| `@types/react`                | ^19.2.18 | TypeScript type definitions for React (used by editor tooling even in JS projects) |
| `@types/react-dom`            | ^19.2.4  | TypeScript type definitions for React DOM                                          |

---

## 14. Troubleshooting

### Node version is wrong

**Symptom:** `npm run dev` fails with an error about Node.js version or an unrecognised option.

**Fix:** Check your Node version with `node -v`. Vite 8 requires `^20.19.0` or `>=22.12.0`. Use nvm to switch:

```bash
nvm install 22
nvm use 22
```

### `npm install` fails or `node_modules` is missing

**Fix:** Delete the lock file and `node_modules`, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### ESLint reports "Parsing error: ESLint was configured to run on..."

**Symptom:** ESLint errors appear on `.jsx` files even though the config includes them.

**Cause:** You may be running a global `eslint` binary that is a different version and does not support Flat Config.

**Fix:** Always use the project-local ESLint:

```bash
npx eslint .
# or via the script:
npm run lint
```

### VS Code ESLint extension is not picking up errors

**Cause:** The ESLint VS Code extension may default to legacy config mode.

**Fix:** Add this to your `.vscode/settings.json`:

```json
{
  "eslint.useFlatConfig": true
}
```

Then restart VS Code.

### Prettier and ESLint are fighting each other

**Symptom:** ESLint reports a formatting error that immediately reappears after Prettier formats the file, or vice versa.

**Explanation:** This should not happen in this project because `eslint-config-prettier` is installed and placed last in the config array, which disables all ESLint rules that touch formatting. If you are seeing this, check that:

1. `eslint-config-prettier` is present in `package.json` devDependencies.
2. It appears as the final entry in the `eslint.config.js` array (`eslintConfigPrettier` after all `extends`).

### Line ending (CRLF vs LF) warnings on Windows

**Symptom:** Prettier reports formatting differences on Windows even though you haven't changed the file.

**Cause:** `.prettierrc` sets `"endOfLine": "lf"`, but Windows Git may check out files with CRLF.

**Fix:** Configure Git to not convert line endings on checkout:

```bash
git config core.autocrlf false
```

Then re-checkout the affected files or run `npm run format` to normalise them.

### Build fails with module not found errors

**Fix:** Make sure `node_modules` is fully installed:

```bash
npm install
npm run build
```

If the error persists, check that the import path is correct (paths are case-sensitive on Linux/macOS) and that the package is listed in `package.json`.

### `debug.log` file appeared in the project root

This file is a Chromium/Electron crash log and should **not** be committed. It is already listed in `.gitignore` (the `*.log` pattern). If it appears in `git status`, confirm your `.gitignore` is being respected — it may have been added before the ignore rule existed.
