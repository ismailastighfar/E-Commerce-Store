import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getCoupon, validateCoupon, createCoupon } from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/", protectedRoute, getCoupon);
router.post("/validate", protectedRoute, validateCoupon);
router.post("/", protectedRoute, createCoupon);

export default router;
