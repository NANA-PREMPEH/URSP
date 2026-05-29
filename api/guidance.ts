import { getGuidanceResult } from "../src/server/urspApi";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const result = await getGuidanceResult(req.body);
  res.status(result.status).json(result.body);
}
