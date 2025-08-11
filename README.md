# ShoppyGlobe — MERN E-Commerce Application

ShoppyGlobe is a full-stack **MERN (MongoDB, Express, React, Node.js)** based E-Commerce application that allows users to browse products, view detailed product pages, register/login with authentication, and manage their shopping cart.  
The backend follows **MVC architecture** and integrates with MongoDB for data storage.  
It also supports **product seeding** from a Dummy API.

---

## Features

### **Frontend (React)**
- **Home Page** with welcome banner
- **Product Search** with live filtering
- **Product List** & **Product Details** page
- **Cart Management** (Add, Remove, Increment, Decrement)
- **User Authentication** (Register / Login) with JWT
- **Responsive & Styled UI** (Orange + Black theme)

### **Backend (Node.js + Express + MongoDB)**
- **MVC Architecture** (Models, Controllers, Routes)
- RESTful API endpoints for products, users, and cart
- JWT-based authentication & authorization
- CORS enabled for frontend-backend communication
- MongoDB for product & user storage
- **Product Seeding** from DummyJSON API

---

## Installation & Setup

### **Backend Setup**
```bash
cd backend
npm install
npm run seed
npm start

### **Frontend Setup**
```bash
cd ..
npm install
npm run dev
