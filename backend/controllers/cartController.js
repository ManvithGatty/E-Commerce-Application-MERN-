import CartItem from "../models/Cartitem.js";
import Product from "../models/Product.js";

// Adds product to cart
export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity) return res.status(400).json({ message: "Not enough stock" });

    const existing = await CartItem.findOne({ user: userId, product: productId });
    if (existing) {
      existing.quantity += Number(quantity);
      await existing.save();
      return res.json(existing);
    }

    const cartItem = await CartItem.create({ user: userId, product: productId, quantity ,message: "Item added to cart"});
    res.status(201).json(cartItem);
  } catch (err) {
    next(err);
  }
};

// Updates existing item in cart
export const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    if (cartItem.user.toString() !== userId) return res.status(403).json({ message: "Not authorized" });

    if (cartItem.product.stock < quantity) return res.status(400).json({ message: "Not enough stock" });

    cartItem.quantity = quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
};

// Delete an item in cart
export const removeCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { cartItemId } = req.params;

    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    if (cartItem.user.toString() !== userId) return res.status(403).json({ message: "Not authorized" });

    await cartItem.deleteOne();
    res.json({ message: "Removed" });
  } catch (err) {
    next(err);
  }
};


// displays items in cart
export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const items = await CartItem.find({ user: userId }).populate("product");
    res.json(items);
  } catch (err) {
    next(err);
  }
};
