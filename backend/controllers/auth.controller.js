import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";


const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

const storeRefreshToken = async (userId, refreshToken) => {
    try {
        await redis.set(`refresh_token:${userId}`, refreshToken, 'EX', 60 * 60 * 24 * 7); // Store for 7 days
    } catch (error) {
        console.error("Error storing refresh token in Redis:", error);
    }
};



export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    // if (!name || !email || !password) {
    //     return res.status(400).json({ message: "All fields are required" });
    // }
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();

        const {accessToken, refreshToken} = generateTokens(newUser._id);
        await storeRefreshToken(newUser._id, refreshToken);
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({ message: "User created successfully" , 
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            } 
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
        console.error("Error creating user:", error);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }  
    try {
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);
            res.status(200).json({ message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                } 
            }); 
        }
        else {
            return res.status(401).json({ message: "Invalid email or password" });
        }  
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};


export const logout = (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
            if (!refreshToken) {
                return res.status(401).json({ message: "No refresh token provided" });
            }

        const userId = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET).userId;
        redis.del(`refresh_token:${userId}`);
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Error logging out", error : error.message });
    }
};

export const refreshToken = async (req, res) => {
    const OldrefreshToken = req.cookies.refresh_token;
    if (!OldrefreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
        const decoded = jwt.verify(OldrefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.userId;

        const storedRefreshToken = await redis.get(`refresh_token:${userId}`);
        if (OldrefreshToken !== storedRefreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const { accessToken, refreshToken } = generateTokens(userId);
        await storeRefreshToken(userId, refreshToken);
        setCookies(res, accessToken, refreshToken);

        res.status(200).json({ message: "Tokens refreshed successfully" });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ message: "Error refreshing token", error: error.message });
    }
}

export const getProfile = async (req, res) => {
    const userId = req.user;
    console.log("User ID from token:", userId);
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};