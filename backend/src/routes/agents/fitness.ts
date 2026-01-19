// backend/src/routes/agents/fitness.ts
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/fitness-plan", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8006/generate-plan",
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );

    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({
      error: "Fitness planner failed",
      details: err.response?.data || err.message,
    });
  }
});

export default router;
