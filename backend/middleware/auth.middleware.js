import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized - No access token provided" });
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return res.status(401).json({ message: "Unauthorized - User not found" });
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
        }
    } catch (error) {
        console.error("Error in protectedRoute middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
};

// adminroute runs after protectedRoute
export const adminRoute = async (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden - Admin access required" });
        }
    } catch (error) {
        console.error("Error in adminRoute middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


   