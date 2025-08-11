import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    image: { type: String, default: "" },
    rating: { type: Number, default: 4.5 },
    category: { type: String, default: "None" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
