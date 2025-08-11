import Product from "../models/Product.js";
import { connectDB } from "../config/db.js";
import axios from "axios";

const MONGO_URI = "mongodb+srv://manvithgatty87:xavier1234@myproject.g3czisr.mongodb.net/";

// takes products from dummy api and loads it to the Db once
const seed = async () => {
  try {
    await connectDB(MONGO_URI);

    console.log("Fetching products from DummyJSON API...");
    const { data } = await axios.get("https://dummyjson.com/products");

    // Map API fields to Product schema
    const products = data.products.map((p) => ({
      name: p.title,
      description: p.description,
      price: p.price,
      stock: p.stock,
      image: p.thumbnail,
      rating: p.rating,
      category: p.category
    }));

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log(`Seeded ${products.length} products from DummyJSON`);
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
