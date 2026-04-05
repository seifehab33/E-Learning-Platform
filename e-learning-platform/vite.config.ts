import { createRequire } from "node:module";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const require = createRequire(import.meta.url);
const db = require("./src/database/db.json") as Record<string, unknown>;

const mockApiPlugin = () => ({
  name: "mock-api-plugin",
  configureServer(server: {
    middlewares: {
      use: (
        handler: (
          req: { method?: string; url?: string },
          res: {
            statusCode: number;
            setHeader: (name: string, value: string) => void;
            end: (body: string) => void;
          },
          next: () => void
        ) => void
      ) => void;
    };
  }) {
    server.middlewares.use((req, res, next) => {
      if (req.method !== "GET" || !req.url?.startsWith("/api/")) {
        next();
        return;
      }

      const [pathPart, queryString = ""] = req.url.split("?");
      const segments = pathPart.replace(/^\/api\//, "").split("/").filter(Boolean);
      const [resource, id] = segments;

      if (!resource) {
        next();
        return;
      }

      const data = db[resource];

      if (!data) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Resource not found" }));
        return;
      }

      if (id) {
        if (!Array.isArray(data)) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Resource not found" }));
          return;
        }

        const item = data.find((entry) => String(entry.id) === String(id));
        if (!item) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Item not found" }));
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(item));
        return;
      }

      if (
        resource === "Users" &&
        Array.isArray(data) &&
        queryString.includes("email=")
      ) {
        const params = new URLSearchParams(queryString);
        const email = params.get("email")?.toLowerCase();
        const filteredUsers = data.filter(
          (item) => item.email?.toLowerCase() === email
        );

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(filteredUsers));
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mockApiPlugin()],
});
