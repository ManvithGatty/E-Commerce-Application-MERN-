import { useDispatch } from "react-redux";
import {
  updateCartQuantity,
  removeItemFromCart,
} from "../redux/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const productData = item.product || item;

  return (
    <div className="cart-item">
      <img src={productData.image} alt={productData.name} />
      <p>{productData.name}</p>

      <div className="quantity-controls">
        <button
          onClick={() =>
            dispatch(updateCartQuantity(item._id, item.quantity - 1))
          }
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() =>
            dispatch(updateCartQuantity(item._id, item.quantity + 1))
          }
        >
          +
        </button>
      </div>

      <button onClick={() => dispatch(removeItemFromCart(item._id))}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
