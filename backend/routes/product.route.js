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
import upload from '../middleware/file.middleware.js';
const router = express.Router();

router.get("/", protectedRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectedRoute, adminRoute, upload.single('image'), createProduct);
router.patch("/:id", protectedRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectedRoute, adminRoute, deleteProduct);

export default router;