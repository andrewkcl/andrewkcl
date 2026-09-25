# andrewkcl

A small full-stack **Task Tracker** demo used to exercise a Cloud Agent development environment end to end.

- **Backend:** Node.js + [Express](https://expressjs.com/) REST API with an in-memory task store.
- **Frontend:** static HTML/CSS/vanilla-JS single page served by the same server.
- **Tests:** [Vitest](https://vitest.dev/) + [supertest](https://github.com/ladjs/supertest) covering the API.
- **Lint:** [ESLint](https://eslint.org/) (flat config).

## Requirements

- Node.js >= 20 (developed on Node 22)

## Getting started

```bash
npm install     # install dependencies
npm start       # run the server on http://localhost:3000
```

Then open http://localhost:3000 and add, complete, or delete tasks.

## Scripts

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `npm start`    | Start the production server (`src/server.js`) |
| `npm run dev`  | Start with `--watch` for auto-reload          |
| `npm test`     | Run the Vitest test suite                     |
| `npm run lint` | Lint `src`, `test`, and `public`              |

## API

| Method   | Path                    | Description            |
| -------- | ----------------------- | ---------------------- |
| `GET`    | `/api/health`           | Health check           |
| `GET`    | `/api/tasks`            | List tasks             |
| `POST`   | `/api/tasks`            | Create a task `{title}`|
| `POST`   | `/api/tasks/:id/toggle` | Toggle a task's status |
| `DELETE` | `/api/tasks/:id`        | Delete a task          |

The server binds to `0.0.0.0` and honors the `PORT` and `HOST` environment variables.

## Cloud Agent environment

The `.cursor/environment.json` file configures the Cloud Agent environment:

- `install`: `npm ci` to install dependencies from the lockfile.
- `terminals`: runs `npm start` so the app server is available with visible logs.
