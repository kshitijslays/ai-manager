import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/whatsapp-outreach", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8005/whatsapp-outreach",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json(response.data);
  } catch (error: any) {
    console.error("WHATSAPP AGENT ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "WhatsApp outreach failed",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
