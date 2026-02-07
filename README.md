# Shopping Cart Application

A curated fashion e-commerce store built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 View the Site Locally

Once the application is running, access the frontend at:  
👉 **[http://localhost:5174](http://localhost:5174)**

*(Note: If port 5174 is occupied, Vite may switch to 5175 or 5173. Check your terminal output.)*

## 🛠️ Setup & Running

### Prerequisites
- Node.js installed
- MongoDB running locally (default: `mongodb://localhost:27017/shopping-cart`)

### 1. Start Backend
The backend runs on port **5000**.
```bash
cd backend
npm install
# (Optional) Reset/Seed database with curated fashion items
node seed.js
# Start the server
node server.js
```

### 2. Start Frontend
The frontend runs on port **5174** (configured in package.json/vite config).
```bash
cd frontend
npm install
npm run dev
```

## ✨ Features
- **User Authentication**: Single-device login enforcement.
- **Product Catalog**: Curated list of western fashion items with high-quality images.
- **Shopping Cart**: Add items and persist cart state.
- **Order System**: Checkout and view order history.
