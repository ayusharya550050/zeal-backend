import express from "express";
import {
  getFooter,
  updateDevelopers,
  updateContact,
  updateFooter
} from "../controllers/footerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Public read */
router.get("/", getFooter);

/* Protected writes */
router.put("/", protect, updateFooter);
router.put("/developers", protect, updateDevelopers);
router.put("/contact",    protect, updateContact);

export default router;
