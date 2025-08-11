import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

// Individual Product for product list
function ProductItem({ data }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to your cart.");
      return;
    }
    dispatch(addItemToCart(data));
  };

  return (
    <div className="product-item">
      <Link to={`/product/${data._id}`}>
        <img src={data.image} alt={data.name} className="product-thumb" />
      </Link>

      <div className="product-details">
        <h3 className="product-title">
          <Link to={`/product/${data._id}`}>{data.name}</Link>
        </h3>
        <p className="product-price">${data.price}</p>
        <p className="product-meta">⭐ {data.rating} | {data.category}</p>
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
