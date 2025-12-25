import express from "express";
import {
  getMyProfile,
  updateProfile,
  searchDonors,
  deleteDonor,
} from "../controllers/donor.controller.js";

import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/me", protect, getMyProfile);
router.put("/update", protect, updateProfile);


router.get("/search", searchDonors);

router.delete("/:id", protect, admin, deleteDonor);

export default router;
