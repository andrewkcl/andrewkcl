# andrewkcl

A minimal [Vite](https://vite.dev/) + React + TypeScript web app — a small interactive Task Board.

## Requirements

- Node.js 20+ (developed on Node 22)
- npm 10+

## Getting started

```bash
npm ci        # install dependencies from the lockfile
npm run dev   # start the dev server at http://localhost:5173
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server (host `0.0.0.0`, port `5173`). |
| `npm run build` | Type-check with `tsc -b` and produce a production build in `dist/`. |
| `npm run preview` | Serve the production build (port `4173`). |
| `npm run lint` | Run ESLint over the project. |
| `npm run typecheck` | Type-check without emitting output. |

## Cloud Agent environment

`.cursor/environment.json` configures the Cursor Cloud Agent environment:

- `install`: `npm ci` restores dependencies from `package-lock.json`.
- `terminals`: a `vite-dev` terminal runs `npm run dev` so the app is available on port `5173`.
