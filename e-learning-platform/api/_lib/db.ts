import { readFile } from "node:fs/promises";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "src", "database", "db.json");

export const loadDb = async () => {
  const fileContents = await readFile(DB_PATH, "utf-8");
  return JSON.parse(fileContents) as Record<string, unknown>;
};
