import express from 'express';
import {
    getAllProducts, 
    getFeaturedProducts, 
    createProduct, 
    getRecommendedProducts,
    getProductsByCategory,
    toggleFeaturedProduct,
    deleteProduct
}  from '../controllers/product.controller.js';
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get("/", protectedRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectedRoute, adminRoute, createProduct);
router.patch("/:id", protectedRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectedRoute, adminRoute, deleteProduct);

export default router;