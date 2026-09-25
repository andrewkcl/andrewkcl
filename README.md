# andrewkcl

A tiny [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript web app
(a small todo list) used to bootstrap and validate the development environment.

## Prerequisites

- Node.js 20+ (developed against Node 22)
- npm 10+

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
```

## Scripts

| Command            | Description                                   |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Start the Vite dev server (`--host`).         |
| `npm run build`    | Type-check (`tsc -b`) and build for production.|
| `npm run preview`  | Preview the production build locally.         |
| `npm run lint`     | Run ESLint over the project.                  |
| `npm run typecheck`| Run the TypeScript project build/type check.  |
| `npm run test`     | Run the unit tests once with Vitest.          |

## Project layout

```
.
├── index.html            # Vite entry HTML
├── src/
│   ├── App.tsx           # Todo list component
│   ├── App.test.tsx      # Vitest + Testing Library tests
│   ├── main.tsx          # React entry point
│   └── setupTests.ts     # jest-dom matchers for Vitest
├── vite.config.ts        # Vite + Vitest config
└── .cursor/environment.json  # Cloud Agent environment
```

## Cloud Agent environment

The [`.cursor/environment.json`](.cursor/environment.json) file configures the Cursor
Cloud Agent environment: it installs dependencies with `npm ci` and runs the Vite dev
server in a persistent `dev` terminal on port `5173`.
