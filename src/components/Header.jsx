import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart, setCart } from "../redux/cartSlice";

function Header() {
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setCart([]));
    navigate("/login");
  };

  return (
    <nav className="header">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">
            <img className="cart-img" src="/grocery-store.png" alt="Cart" /> ({cartCount})
          </Link>
        </li>
        {token ? (
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
