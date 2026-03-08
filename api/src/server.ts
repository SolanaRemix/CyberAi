import express from "express";

const app = express();

app.get("/contracts", async (_req, res) => {
  // minimal placeholder that returns an empty array
  res.json([]);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export { app };
