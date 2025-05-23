import Product from "../models/product.model.js";
import {redis} from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
        console.error("Error fetching products:", error);
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
       let featuredProducts = await redis.get("featured_Products");
        if (!featuredProducts) {
            featuredProducts = await Product.find({ isFeatured: true });
            if (!featuredProducts) {
                return res.status(404).json({ message: "No featured products found" });
            }
            redis.set("featured_Products", JSON.stringify(featuredProducts));
        } else {
            featuredProducts = JSON.parse(featuredProducts);
        }
        res.status(200).json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching featured products", error: error.message });
        console.error("Error fetching featured products:", error);
    }
};

export const createProduct = async (req, res) => {
   
    try {
        // Form data fields will be in req.body
        const { name, description, price, category, isFeatured } = req.body;
        
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        
        // Check if the product already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(409).json({ message: "Product already exists" });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            isFeatured: isFeatured === 'true' // Convert string to boolean
        });

        // Upload image to cloudinary from buffer
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, 
            { folder: "ecommerce" }
        );
        
        newProduct.image = result?.secure_url ? result.secure_url : "";
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
        console.error("Error creating product:", error);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        console.log("Product deleted:", product);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Remove the image from cloudinary
        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`ecommerce/${publicId}`);
            console.log("Image deleted from Cloudinary:", publicId);
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
        console.error("Error deleting product:", error);
    }
}

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 4 } },
            { $project: { name: 1, description: 1, price: 1, image: 1 } }
        ]);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommended products", error: error.message });
        console.error("Error fetching recommended products:", error);
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products by category", error: error.message });
        console.error("Error fetching products by category:", error);
    }
};

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.isFeatured = !product.isFeatured;
        const updatedProduct = await product.save();
        // Update the cache
        await updateFeaturedProductsCache();
        res.status(200).json({ message: "Product featured status updated", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating featured status", error: error.message });
        console.error("Error updating featured status:", error);
    }
};

async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true });
        if (featuredProducts) {
            await redis.set("featured_Products", JSON.stringify(featuredProducts));
        }
    } catch (error) {
        console.error("Error updating featured products cache:", error);
    }
}