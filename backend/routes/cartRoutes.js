import express from "express";
import { getCart, addToCart, updateCartItem, removeCartItem } from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { body } from "express-validator";

const router = express.Router();

router.use(protect);

router.get("/", getCart);

router.post("/",
  [ body("productId").notEmpty().withMessage("productId is required") ],
  addToCart
);

router.put("/:cartItemId", updateCartItem);
router.delete("/:cartItemId", removeCartItem);

export default router;
