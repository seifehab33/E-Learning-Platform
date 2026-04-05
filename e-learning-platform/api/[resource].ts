import { loadDb } from "./_lib/db.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { resource } = req.query;
  const db = await loadDb();
  const data = db[resource];

  if (!data) {
    return res.status(404).json({ message: "Resource not found" });
  }

  if (resource === "Users" && req.query.email && Array.isArray(data)) {
    const email = String(req.query.email).toLowerCase();
    return res
      .status(200)
      .json(data.filter((item: any) => item.email?.toLowerCase() === email));
  }

  return res.status(200).json(data);
}
