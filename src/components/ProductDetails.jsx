import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import API from "../api/axios";

// Product page
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to your cart.");
      return;
    }
    dispatch(addItemToCart(product));
  };

  if (!product) {
    return (
      <div className="product-detail">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p className="product-price">₹{product.price}</p>
        <p className="product-stock">In Stock: {product.stock}</p>
        <p className="product-desc">{product.description}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;
