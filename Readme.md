# 🛒 E-Commerce Store with MERN Stack

<div align="center">
    <img src="https://img.shields.io/badge/Status-Active-success" alt="Status" />
    <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version" />
</div>

## 🌟 Project Overview

A full-featured e-commerce platform built with the MERN stack featuring product management, shopping cart functionality, payment processing, and admin analytics.

## 🛠️ Tech Stack

### Backend
<p>
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
    <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
    <img alt="Redis" src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
    <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON web tokens&logoColor=white">
</p>

### Frontend
<p>
    <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
    <img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
    <img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
    <img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">
    <img alt="Zustand" src="https://img.shields.io/badge/Zustand-brown?style=for-the-badge&logo=react&logoColor=white">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

### Services & Tools
<p>
    <img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white">
    <img alt="Stripe" src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white">
    <img alt="Recharts" src="https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=react&logoColor=white">
    <img alt="Hot Toast" src="https://img.shields.io/badge/React_Hot_Toast-FF4154?style=for-the-badge&logo=react&logoColor=white">
    <img alt="Lucide Icons" src="https://img.shields.io/badge/Lucide_React-000000?style=for-the-badge&logo=lucide&logoColor=white">
</p>

### Security
<p>
    <img alt="Bcrypt" src="https://img.shields.io/badge/Bcrypt-003B70?style=for-the-badge">
    <img alt="HTTP-only Cookies" src="https://img.shields.io/badge/HTTP_only_Cookies-2C3E50?style=for-the-badge">
</p>

## 📁 Project Structure

```
E-Commerce-Store/
├── backend/
│   ├── controllers/       # Request handlers
│   │   ├── analytics.controller.js
│   │   ├── auth.controller.js
│   │   ├── cart.controller.js
│   │   ├── coupon.controller.js
│   │   ├── payment.controller.js
│   │   └── product.controller.js
│   ├── lib/              # Configuration and libraries
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   ├── redis.js
│   │   └── stripe.js
│   ├── middleware/       # Express middleware
│   │   ├── auth.middleware.js
│   │   └── file.middleware.js
│   ├── models/           # MongoDB models
│   │   ├── coupon.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes/           # API routes
│   │   ├── analytics.route.js
│   │   ├── auth.route.js
│   │   ├── cart.route.js
│   │   ├── coupon.route.js
│   │   ├── payment.route.js
│   │   └── product.route.js
│   └── server.js         # Entry point
├── frontend/            # React application (planned)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       ├── store/
│       └── App.jsx
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── Readme.md
```

## ✨ Features

<table>
    <tr>
        <td>
            <h3>🔐 User Authentication</h3>
            <ul>
                <li>📝 User registration and login</li>
                <li>🔑 JWT authentication with refresh tokens</li>
                <li>🚪 Secure logout mechanism</li>
                <li>👤 User profile access</li>
            </ul>
        </td>
        <td>
            <h3>🛍️ Product Management</h3>
            <ul>
                <li>📦 Create, update, and delete products</li>
                <li>🔎 Product categorization</li>
                <li>⭐ Featured products system</li>
                <li>🖼️ Image upload with Cloudinary</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <h3>🛒 Shopping Experience</h3>
            <ul>
                <li>🔍 Product browsing and filtering</li>
                <li>🛒 Cart management</li>
                <li>📊 Product recommendations</li>
                <li>💵 Secure checkout process</li>
            </ul>
        </td>
        <td>
            <h3>💰 Payment & Discounts</h3>
            <ul>
                <li>💳 Stripe payment integration</li>
                <li>🏷️ Coupon code system</li>
                <li>📝 Order tracking</li>
                <li>🎁 Loyalty rewards for big purchases</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <h3>📊 Admin Features</h3>
            <ul>
                <li>📈 Sales analytics dashboard</li>
                <li>🔍 Product inventory management</li>
                <li>👥 User role management</li>
                <li>📊 Daily sales reporting</li>
            </ul>
        </td>
        <td>
            <h3>🔧 Technical Features</h3>
            <ul>
                <li>⚡ Redis caching for performance</li>
                <li>🔒 Protected API routes</li>
                <li>☁️ Cloud image storage</li>
                <li>🔄 Real-time data updates</li>
            </ul>
        </td>
    </tr>
</table>

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- MongoDB account
- Redis instance (Upstash)
- Cloudinary account
- Stripe account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/e-commerce-store.git
cd e-commerce-store
```

2. **Install dependencies**
```bash
# Install server dependencies
npm install
```

3. **Environment Configuration**

Create a `.env` file in the root directory:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
UPSTASH_REDIS_URL=your_redis_url
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

4. **Start Development Server**

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/refresh-token` | Refresh access token |
| GET | `/api/auth/profile` | Get user profile |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (admin) |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/products/category/:category` | Get products by category |
| GET | `/api/products/recommendations` | Get recommended products |
| POST | `/api/products` | Create product (admin) |
| PATCH | `/api/products/:id` | Toggle featured status (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add item to cart |
| DELETE | `/api/cart` | Remove all items from cart |
| PUT | `/api/cart/:id` | Update item quantity |

### Coupons
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/coupon` | Get available coupons |
| POST | `/api/coupon/validate` | Validate coupon code |
| POST | `/api/coupon` | Create coupon |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create-checkout-session` | Create Stripe checkout session |
| POST | `/api/payments/checkout-success` | Handle successful payment |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics` | Get sales analytics data (admin) |

## 🔒 Security Implementation
- Password hashing with bcrypt
- JWT authentication via HTTP-only cookies
- Refresh token rotation
- Protected and admin-only routes
- Redis for secure token storage
- Input validation and sanitization

## 🔮 Future Roadmap
- [ ] User reviews and ratings system
- [ ] Wishlist functionality
- [ ] Advanced product search with filters
- [ ] Email notifications for order status
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Inventory management system
- [ ] Multiple payment gateway integration