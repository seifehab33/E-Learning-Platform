import { loadDb } from "../_lib/db";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { resource, id } = req.query;
  const db = await loadDb();
  const data = db[resource];

  if (!Array.isArray(data)) {
    return res.status(404).json({ message: "Resource not found" });
  }

  const item = data.find((entry: any) => String(entry.id) === String(id));

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.status(200).json(item);
}
