import express from "express";
import {
  getMyProfile,
  updateProfile,
  searchDonors,
  deleteDonor,
} from "../controllers/donor.controller.js";

import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

/* Protected donor routes */
router.get("/me", protect, getMyProfile);
router.put("/update", protect, updateProfile);

/* Search donors (publicly available or protect if needed) */
router.get("/search", searchDonors);

/* Admin-only route */
router.delete("/:id", protect, admin, deleteDonor);

export default router;
