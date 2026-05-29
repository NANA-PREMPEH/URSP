import { getHealthResult } from "../src/server/urspApi";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const result = getHealthResult();
  res.status(result.status).json(result.body);
}
