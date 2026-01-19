import express from "express";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";

const router = express.Router();
const upload = multer();

router.post(
  "/resume-match",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "job", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ error: "No files received" });
      }

      const files = req.files as {
        resume: Express.Multer.File[];
        job: Express.Multer.File[];
      };

      const formData = new FormData();
      formData.append("resume", files.resume[0].buffer, "resume.pdf");
      formData.append("job", files.job[0].buffer, "job.pdf");

      const response = await axios.post(
        process.env.RESUME_AGENT_URL || "http://127.0.0.1:8001/match-resume/files",
        formData,
        {
          headers: formData.getHeaders(),
        }
      );

      return res.json(response.data);
    } catch (error: any) {
      console.error("❌ ERROR FROM RESUME ROUTE:", error.message);

      return res.status(500).json({
        error: "Resume agent failed",
        details: error.response?.data || error.message,
      });
    }
  }
);

export default router;
