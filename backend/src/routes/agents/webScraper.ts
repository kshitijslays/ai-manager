import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/web-scrape", async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { url, goal } = req.body;

    if (!url || !goal) {
      return res.status(400).json({
        error: "url and goal are required",
      });
    }

    const response = await axios.post(
      "http://127.0.0.1:8003/scrape",
      { url, goal }, // ✅ JSON forward
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json(response.data);
  } catch (error: any) {
    console.error("WEB SCRAPER ERROR:", error.message);

    return res.status(500).json({
      error: "Web scraper failed",
      details: error.response?.data || error.message,
    });
  }
});


export default router;
