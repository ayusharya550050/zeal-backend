import express from "express";
import {
  createSection,
  getAllSections,
  deleteSection,
  addMember,
  updateMember,
  deleteMember
} from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllSections);
router.post("/section", protect, createSection);
router.delete("/section/:sectionId", protect, deleteSection);

router.post("/:sectionId", protect, upload.single("image"), addMember);
router.put("/:sectionId/:memberId", protect, upload.single("image"), updateMember);
router.delete("/:sectionId/:memberId", protect, deleteMember);

export default router;