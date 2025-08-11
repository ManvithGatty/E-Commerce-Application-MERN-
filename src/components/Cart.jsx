import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CartItem from "./CartItem";
import { fetchCart } from "../redux/cartSlice";

// Cart Page
function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 && (
        <p style={{ margin: "20px" }}>No items in cart.</p>
      )}
      {cartItems.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
}

export default Cart;
