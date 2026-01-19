import "dotenv/config";
import express from "express";
import cors from "cors";

import resumeAgent from "./routes/agents/resume";
import webScraperAgent from "./routes/agents/webScraper";
import emailOutreach from "./routes/agents/emailOutreach";
import whatsappAgent from "./routes/agents/whatsapp";
import fitnessAgent from "./routes/agents/fitness";

const app = express();

/* 🔥 CORS FIRST */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

/* 🔥 NORMAL AGENT ROUTES */
app.use("/api/agents", webScraperAgent);
app.use("/api/agents", resumeAgent);
app.use("/api/agents", emailOutreach);
app.use("/api/agents", whatsappAgent);
app.use("/api/agents", fitnessAgent);

export default app;