import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// 404 and error middleware
app.use(notFound);
app.use(errorHandler);

// Connect DB and start server
const PORT = process.env.PORT || 5050;
const MONGO_URI = "mongodb+srv://manvithgatty87:xavier1234@myproject.g3czisr.mongodb.net/"; 

connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
