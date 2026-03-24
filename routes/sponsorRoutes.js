import express from "express";
import {
  createCategory,
  getAllSponsors,
  deleteCategory,
  addSponsor,
  updateSponsor,
  deleteSponsor,
} from "../controllers/sponsorController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* -----------------------------
   Category Routes
------------------------------ */
router.get("/", getAllSponsors);
router.post("/category", protect, createCategory);
router.delete("/category/:id", protect, deleteCategory);

/* -----------------------------
   Sponsor Routes (inside category)
------------------------------ */
router.post("/:categoryId", protect, upload.single("image"), addSponsor);
router.put("/:categoryId/:sponsorId", protect, upload.single("image"), updateSponsor);
router.delete("/:categoryId/:sponsorId", protect, deleteSponsor);

export default router;