import db from "../../src/database/db.json";

export const loadDb = async () => {
  return db as Record<string, unknown>;
};
