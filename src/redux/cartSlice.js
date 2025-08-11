import { createSlice } from "@reduxjs/toolkit";
import API from "../api/axios";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartItems = action.payload;
    },
    addToCart(state, action) {
      const item = state.cartItems.find(
        (product) => product._id === action.payload._id
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    incrementQuantity(state, action) {
      const item = state.cartItems.find(
        (product) => product._id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const item = state.cartItems.find(
        (product) => product._id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

// Backend sync actions
export const fetchCart = () => async (dispatch) => {
  try {
    const { data } = await API.get("/cart");
    dispatch(setCart(data));
  } catch (err) {
    console.error("Failed to fetch cart:", err);
  }
};

export const addItemToCart = (product) => async (dispatch) => {
  try {
    await API.post("/cart", { productId: product._id, quantity: 1 });
    dispatch(fetchCart());
  } catch (err) {
    console.error("Failed to add item:", err);
  }
};

export const removeItemFromCart = (productId) => async (dispatch) => {
  try {
    await API.delete(`/cart/${productId}`);
    dispatch(fetchCart());
  } catch (err) {
    console.error("Failed to remove item:", err);
  }
};

export const updateCartQuantity = (productId, quantity) => async (dispatch) => {
  try {
    await API.put(`/cart/${productId}`, { quantity });
    dispatch(fetchCart());
  } catch (err) {
    console.error("Failed to update quantity:", err);
  }
};
