import express from "express";
import { registerDonor, loginDonor } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerDonor);
router.post("/login", loginDonor);

export default router;
