import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * Generate cold email using FastAPI + Groq
 */
/**
 * Send bulk emails from Google Sheet using FastAPI
 */
router.post("/send-bulk-emails-from-google-sheet", async (req, res) => {
  try {
    const {
      sheet_url,
      company_url,
      service_offered,
      sender_name,
      sender_email,
      max_pages,
    } = req.body;

    // 🔒 Validation
    if (!sheet_url || !company_url || !service_offered || !sender_name || !sender_email) {
      return res.status(400).json({
        error:
          "sheet_url, company_url, service_offered, sender_name, sender_email are required",
      });
    }

    // 🔗 Call FastAPI bulk endpoint
    const response = await axios.post(
      "http://127.0.0.1:8004/send-bulk-emails-from-google-sheet",
      {
        sheet_url,
        company_url,
        service_offered,
        sender_name,
        sender_email,
        max_pages: max_pages || 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 120000, // bulk emails take time
      }
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error("❌ BULK EMAIL ERROR:", error?.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: "Bulk email sending failed",
      details: error?.response?.data || error.message,
    });
  }
});

router.post("/email-outreach", async (req, res) => {
  try {
    const {
      company_url,
      service_offered,
      sender_name,
      sender_email,
      max_pages,
    } = req.body;

    // 🔒 Validation
    if (!company_url || !service_offered || !sender_name || !sender_email) {
      return res.status(400).json({
        error:
          "company_url, service_offered, sender_name, sender_email are required",
      });
    }

    // 🔗 Call FastAPI backend
    const response = await axios.post(
      "http://127.0.0.1:8004/generate-email",
      {
        company_url,
        service_offered,
        sender_name,
        sender_email,
        max_pages: max_pages || 1,
        // ❌ DO NOT send groq_api_key from frontend
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return res.status(200).json({
      success: true,
      email: response.data.email,
    });
  } catch (error: any) {
    console.error("❌ EMAIL AGENT ERROR:", error.message);

    return res.status(500).json({
      success: false,
      error: "Email generation failed",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
