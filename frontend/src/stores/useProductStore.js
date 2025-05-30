import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
    set({ loading: true });  
    try {
        const res = await axios.post("/products", productData);
        set((state) => ({
            products: [...state.products, res.data],  
            loading: false,
        }));
        toast.success("Product created successfully"); 
        return res.data; 
    } catch (error) {
        console.error("Error creating product:", error);
        const errorMessage = error.response?.data?.message || 
                             error.response?.data?.error || 
                             "Failed to create product";
        toast.error(errorMessage);
        set({ loading: false });
        throw error; 
    }
},
	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products");
			console.log("Fetched products:", response.data);
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	fetchProductsByCategory: async (category) => {
		set({ products : [], loading: true });
		try {
			const response = await axios.get(`/products/category/${category}`);
			console.log("Fetched products by category:", response.data.length);
			if (response.data.length === 0) {
				set({ products: [], loading: false });
			}
			set({ products: response.data, loading: false });
		} catch (error) {
			console.log("error", error.message)
		}
	},
	deleteProduct: async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
    }
    
    set({ loading: true });
    try {
        await axios.delete(`/products/${productId}`);
        set((state) => ({
            products: state.products.filter((product) => product._id !== productId),
            loading: false,
        }));
        toast.success("Product deleted successfully");
    } catch (error) {
        set({ loading: false });
        toast.error(error.response?.data?.message || 
                   error.response?.data?.error || 
                   "Failed to delete product");
    }
},
toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
        const response = await axios.patch(`/products/${productId}`);
        
        set((state) => ({
            products: state.products.map((product) =>
                product._id === productId 
                    ? { ...product, isFeatured: response.data.product.isFeatured } 
                    : product
            ),
            loading: false,
        }));
        
        toast.success(`Product ${response.data.product.isFeatured ? 'featured' : 'unfeatured'} successfully`);
    } catch (error) {
        set({ loading: false });
        toast.error(error.response?.data?.message || 
                   error.response?.data?.error || 
                   "Failed to update product");
    }
},
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
}));
