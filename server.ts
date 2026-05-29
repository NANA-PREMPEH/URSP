import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import {
  getGuidanceResult,
  getHealthResult,
  getSopPolishResult,
  getVisaFeedbackResult,
  type RouteResult,
} from "./src/server/urspApi.js";

function sendRouteResult(res: express.Response, result: RouteResult): void {
  res.status(result.status).json(result.body);
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    sendRouteResult(res, getHealthResult());
  });

  app.post("/api/guidance", async (req, res) => {
    sendRouteResult(res, await getGuidanceResult(req.body));
  });

  app.post("/api/sop/polish", async (req, res) => {
    sendRouteResult(res, await getSopPolishResult(req.body));
  });

  app.post("/api/visa/feedback", async (req, res) => {
    sendRouteResult(res, await getVisaFeedbackResult(req.body));
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ubuntu Rising Scholars Program (URSP) backend listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
