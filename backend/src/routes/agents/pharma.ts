import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/pharma/query", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8007/query",
      req.body
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({
      error: "Pharma agent failed",
      details: err.message,
    });
  }
});

export default router;
