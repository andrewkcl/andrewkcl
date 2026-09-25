import { createApp } from "./app.js";
import { reset } from "./store.js";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

reset(["Explore the codebase", "Set up the Cloud Agent environment"]);

const app = createApp();

app.listen(PORT, HOST, () => {
  console.log(`andrewkcl task tracker listening on http://${HOST}:${PORT}`);
});
