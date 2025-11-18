import express from "express";
import { logout,login,check } from "../Controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login",login)
router.post("/logout",logout)
router.get("/check",protectRoute,check)

export default router;