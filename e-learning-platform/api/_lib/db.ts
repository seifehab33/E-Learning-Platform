import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const db = require("../../src/database/db.json");

export const loadDb = async () => {
  return db as Record<string, unknown>;
};
