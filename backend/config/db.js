// Db connection
import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error("MongoDB URI not provided.");
  }

  mongoose.set("strictQuery", false);

  return mongoose.connect(mongoUri, {
  }).then(() => {
    console.log("MongoDB connected");
  });
};
