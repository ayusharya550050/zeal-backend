import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  getHomeData,
  updateAboutFestival,
  updateStats,
  updateHighlights,
  addGalleryImage,
  deleteGalleryImage,
  updateArtists,
  updateFAQ
} from "../controllers/homeController.js";

const router = express.Router();

router.get("/", getHomeData);
router.put("/about", protect, updateAboutFestival);
router.put("/stats", protect, updateStats);
router.put("/highlights", protect, updateHighlights);
router.post("/gallery", protect, upload.single("image"), addGalleryImage);
router.delete("/gallery/:index", protect, deleteGalleryImage);
router.put("/artists", protect, updateArtists);
router.put("/faq", protect, updateFAQ);

export default router;